// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { uploadFileToFirebase } from '@/lib/firebase';

// GET all products
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { date: 'desc' },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error('Failed to retrieve products:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// POST create product
export async function POST(req) {
    try {
        const formData = await req.formData();

        const title = formData.get('title');
        const description = formData.get('description');
        const price = parseFloat(formData.get('price'));
        const colors = formData.get('colors'); // Expect JSON string

        // Parse colors array
        let colorArray = [];
        try {
            if (colors) {
                colorArray = JSON.parse(colors);
            }
        } catch {
            return NextResponse.json({ error: 'Invalid colors format. Must be valid JSON.' }, { status: 400 });
        }

        // Collect all uploaded files
        const files = formData.getAll('images'); // input name="images"
        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No images provided.' }, { status: 400 });
        }

        const variants = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Pass the File/Blob directly to Firebase upload
            const publicUrl = await uploadFileToFirebase(file);

            variants.push({
                color: colorArray[i] || '#000000',
                image_url: publicUrl,
            });
        }

        const product = await prisma.product.create({
            data: {
                title,
                description,
                price,
                variants,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Unexpected error during product creation:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}