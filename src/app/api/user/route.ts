import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        password: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return user without password, and indicate if password exists
    return NextResponse.json({
      success: true,
      user: {
        ...user,
        hasPassword: !!user.password,
        password: undefined, // Don't send password to client
      },
    });
  } catch (error) {
    console.error("GET USER ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, email, currentPassword, newPassword } = body;

    // Get current user
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if email is being changed and if new email already exists
    if (email && email !== currentUser.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email sudah digunakan oleh user lain" },
          { status: 400 }
        );
      }
    }

    // If changing password
    if (newPassword) {
      // User must have existing password or provide current password
      if (currentUser.password) {
        if (!currentPassword) {
          return NextResponse.json(
            { error: "Password lama diperlukan" },
            { status: 400 }
          );
        }

        const isValid = await bcrypt.compare(currentPassword, currentUser.password);
        if (!isValid) {
          return NextResponse.json(
            { error: "Password lama salah" },
            { status: 400 }
          );
        }
      }

      // Google OAuth users can set password without current password
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "Password minimal 6 karakter" },
          { status: 400 }
        );
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || null,
        email: email || currentUser.email,
        ...(newPassword && { password: await bcrypt.hash(newPassword, 10) }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profil berhasil diperbarui",
      user: updatedUser,
    });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
