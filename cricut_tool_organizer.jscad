

function main() {
      const tool_hole = union(
        cylinder({d:16.5, h:2}),
        cylinder({r1:12.5/2, r2:16.5/2, h:45}),
        translate([0,0,45],sphere({r:16.5/2})),
        cube({size:[12.5,20,30], center:[true,false,false]}),
        translate([0,5,35],cube({size:[28,25,5], center:[true,true,false]})),
        translate([-14,-7.5,5],wedge({size:[28,25,30]}))
    );

    const tool_holder = translate([0,0,55],rotate([180,0,0], difference(
        translate([0,-12.5,0],cube({size:[28,25,55], center:[true,false,false]})),
        tool_hole
    )));

    const all_tool_holders = union( seq(6).map( i => translate([28*i,0,0],tool_holder)) );

    const tip_peg = intersection(
        cylinder({r:3.5,h:6}),
        rotate([0,0,45],cube({size:[6,7,6], center:[true,true,false]}))
    );

    const tall_tip_peg = union(
        translate([0,0,6],tip_peg),
        cylinder({r:6,h:6})
    )

    const cubby = translate([0,0,57],rotate([180,0,0],difference(
        cube({size:[170,27,67], center:[true,true,false]}),
        cube({size:[168,25,65], center:[true,true,false]}),
        translate([0,0,10],mirror([0,0,1],wedge({size:[170,27,10], center:[true,true,false]})))
    )));

    const all_cubbies = union(
        cubby,
        translate([0,27,10],cubby),
        translate([0,54,20],cubby)
        );

    const side_piece_h = 97;
    const side_pieces = translate([0,0,side_piece_h],rotate([180,0,0],difference(
        union(
            difference(
                scale([0.65,1,1],cylinder({r:27*2, h:side_piece_h})),
                scale([0.65,1,1],cylinder({r:27*2-1, h:side_piece_h-1}))
            ),
            cube({size:[2,27*4,side_piece_h], center:[true,true,false]})
        ),
       translate([0,0,40],mirror([0,0,1],wedge({size:[27*4,27*4,40], center:[true,true,false]})))
    )));

    const right_side_piece = intersection(
        side_pieces,
        cube({size:[27*2,27*4,side_piece_h], center:[false,true,false]})
    );

    const left_side_piece = intersection(
        side_pieces,
        translate([-27*2,0,0],cube({size:[27*2,27*4,side_piece_h], center:[false,true,false]}))
    );

    return union(
        all_cubbies,
        translate([-170/2+1,27/2,-20],left_side_piece),
        translate([170/2-1,27/2,-20],right_side_piece),
        translate([0,-27,-20],center([true,true,false],all_tool_holders))

    );
   // return union( center([true,true,false],all_tool_holders), cube({size:[168,25,55], center:[true,true,false]}))
// return union(
//     translate([0,0,1],tip_peg),
//     cube({size:[15,15,1],center:[true,true,false]})
// );
  

}


function wedge(options) {
    const size = options.size;
    return center(options.center, polyhedron({
        points: [
          [0, 0, size[2]], [0, size[1], size[2]], [0, size[1], 0],
          [size[0], 0, size[2]], [size[0], size[1], size[2]], [size[0], size[1], 0],
        ],
        triangles: [
          [2, 1, 0],[4,1,2],[2,5,4],[0,1,4],[0,4,3],
          [3, 4, 5],[0,3,5],[5,2,0]
        ]
      }));
}

function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}