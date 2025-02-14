import React from 'react'

export default function StartAnimation() {
    return (
        <div className="startAnimation">
            <div className="startAnimation__colored-blocks">
                <div className="startAnimation__colored-blocks-rotater">
                    <div className="startAnimation__colored-block" />
                    <div className="startAnimation__colored-block" />
                    <div className="startAnimation__colored-block" />
                </div>
                <div className="startAnimation__colored-blocks-inner" />
                <div className="startAnimation__text">Ready</div>
            </div>
            <div className="startAnimation__inner">
                <svg className="startAnimation__numbers" viewBox="0 0 100 100">
                    <defs>
                        <path className="startAnimation__num-path-1" d="M40,28 55,22 55,78" />
                        <path
                            className="startAnimation__num-join-1-2"
                            d="M55,78 55,83 a17,17 0 1,0 34,0 a20,10 0 0,0 -20,-10"
                        />
                        <path
                            className="startAnimation__num-path-2"
                            d="M69,73 l-35,0 l30,-30 a16,16 0 0,0 -22.6,-22.6 l-7,7"
                        />
                        <path className="startAnimation__num-join-2-3" d="M28,69 Q25,44 34.4,27.4" />
                        <path
                            className="startAnimation__num-path-3"
                            d="M30,20 60,20 40,50 a18,15 0 1,1 -12,19"
                        />
                    </defs>
                    <path
                        className="startAnimation__numbers-path"
                        d="M-10,20 60,20 40,50 a18,15 0 1,1 -12,19 
         Q25,44 34.4,27.4
         l7,-7 a16,16 0 0,1 22.6,22.6 l-30,30 l35,0 L69,73 
         a20,10 0 0,1 20,10 a17,17 0 0,1 -34,0 L55,83 
         l0,-61 L40,28"
                    />
                </svg>
            </div>
        </div>
    )
}
