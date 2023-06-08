import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request : Request) {

    const {todos} = await request.json();
    console.log(todos);
        
    
    const response = await openai.createChatCompletion({
        model : "gpt-3.5-turbo",
        temperature : 0.8,
        n : 1,
        stream : false,
        messages : [
            {
                role : "system",
                content : "Hi i'm from Content"
            },
            {
                role : "user",
                content : `Hi That's a user : ${JSON.stringify(todos)}`,
            },
        ],
    });

    const {data} = response

    console.log("DATA IS :" , data);
    console.log(data.choices[0].message);

    return NextResponse.json(data.choices[0].message)
    
    
}