import { db } from "@/drizzle/drizzle";
import { master_data, NewMasterData } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";



export async function POST (request: NextRequest) {
   try {

    const req = await request.json() as NewMasterData;

    if(req.data == null || req.data == '') 
        {
        return NextResponse.json(
            {
              status: 400,
              status_message: "Please provide data",
              data: {},
            },
            { status: 400 }
          );
        }
    
    const data = await db
                       .insert(master_data)
                       .values(req)
                       .returning();   

    return NextResponse.json(
        {
          status: 200,
          status_message: "Successfully created unit",
          data: data,
        },
        { status: 200 }
      );

   } catch (error) {
    console.error('Error creating unit:', error);
    return NextResponse.json({ error: 'Failed to create unit' }, { status: 500 });
   }
}