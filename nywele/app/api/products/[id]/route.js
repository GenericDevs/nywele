import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { uploadFileToFirebase } from '@/lib/firebase';

// PUT update product
export async function PUT(req, context) {
    const { params } = await context;
    const { id } = params;

    try {
        const formData = await req.formData();

        const title = formData.get('title');
        const description = formData.get('description');
        const price = formData.get('price');
        const colors = formData.get('colors'); // JSON stringified array
        const images = formData.getAll('images'); // Array<File>

        let variants = [];

        if (images && images.length > 0) {
            let colorArray = [];
            try {
                if (colors) {
                    colorArray = JSON.parse(colors);
                }
            } catch (err) {
                return NextResponse.json({ error: 'Invalid colors format.' }, { status: 400 });
            }

            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                const publicUrl = await uploadFileToFirebase(file);

                variants.push({
                    color: colorArray[i] || '#000000',
                    image_url: publicUrl,
                });
            }
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                title,
                description,
                price: parseFloat(price),
                variants: variants.length > 0 ? variants : undefined, // ✅ store as JSON
            },
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error(`❌ Failed to update product ID: ${id}`, error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// DELETE product

export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
        }

        await prisma.product.delete({
            where: { id },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error(`❌ Failed to delete product ID: ${id}`, error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}