import { db } from "@/drizzle/drizzle";
import { master_data, NewMasterData } from "@/drizzle/schema";
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from "next/server";



export async function POST (request: NextRequest) {
   try {

    const req = await request.json();

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

    const newData : NewMasterData = {
        id: uuidv4(),
        data: req.data,
    }
    
    const data = await db
                       .insert(master_data)
                       .values(newData)
                       .returning();   

    return NextResponse.json(
        {
          status: 200,
          status_message: "Successfully saved the master data",
          data: data,
        },
        { status: 200 }
      );

   } catch (error) {
    console.error('Error input the master data:', error);
    return NextResponse.json({ error: 'Failed to save the master data' }, { status: 500 });
   }
}
