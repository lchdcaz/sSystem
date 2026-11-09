import {useRef,useEffect} from 'react'

export function Canvas(canvas:HTMLCanvasElement){
        
        console.log("执行");
        const ctx = canvas.getContext("2d");
        if(!ctx)return;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const coner = new Path2D();
        ctx.save();
        coner.moveTo(0,10);
        coner.lineTo(0,0);
        coner.lineTo(10,0);
        ctx.restore();
        ctx.save();
        ctx.stroke(coner);
        ctx.restore();
        ctx.save();
        ctx.translate(50,0);
        ctx.rotate(Math.PI / 2);
        ctx.stroke(coner);
        ctx.restore();
        ctx.save();
        ctx.translate(0,50);
        ctx.rotate(3 * Math.PI / 2); 
        ctx.stroke(coner);
        ctx.restore();  
        ctx.save();
        ctx.translate(50,50);
        ctx.rotate(2 * Math.PI / 2);
        ctx.stroke(coner);
        ctx.restore();
}