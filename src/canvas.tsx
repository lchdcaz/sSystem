import {useRef,useEffect} from 'react'

export function Canvas(canvas:HTMLCanvasElement){
        const ctx = canvas.getContext("2d");
        if(!ctx)return;
        const coner = new Path2D();
        ctx.save();
        coner.moveTo(0,20);
        coner.lineTo(0,10);
        coner.lineTo(10,10);
        ctx.restore();
        ctx.save();
        ctx.translate(50,0);
        ctx.stroke(coner);
        ctx.restore();
        ctx.save();
        ctx.translate(100,10);
        ctx.rotate(Math.PI / 2);
        ctx.stroke(coner);
        ctx.restore();
        ctx.save();
        ctx.translate(40,50);
        ctx.rotate(3 * Math.PI / 2); 
        ctx.stroke(coner);
        ctx.restore();  
        ctx.save();
        ctx.translate(90,60);
        ctx.rotate(2 * Math.PI / 2);
        ctx.stroke(coner);
}