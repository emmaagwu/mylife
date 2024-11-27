import { NextRequest, NextResponse, RouteHandlerContext} from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/authoptions'

export async function DELETE(
  request: NextRequest,
  context: RouteHandlerContext<{ roleId: string }>
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { roleId } = await context.params

    // Verify the role belongs to the user
    const role = await prisma.role.findFirst({
      where: {
        id: roleId,
        userId: session.user.id
      }
    })

    if (!role) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }

    // Soft delete by marking as archived
    await prisma.role.update({
      where: { id: roleId },
      data: { isArchived: true }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete role' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteHandlerContext<{ roleId: string }>
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await request.json()
    const { title, description, color } = json

    const { roleId } = await context.params
    // Verify the role belongs to the user
    const existingRole = await prisma.role.findFirst({
      where: {
        id: roleId,
        userId: session.user.id
      }
    })

    if (!existingRole) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }

    const updatedRole = await prisma.role.update({
      where: { id: roleId },
      data: {
        title,
        description,
        color
      }
    })

    return NextResponse.json(updatedRole)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update role' },
      { status: 500 }
    )
  }
}