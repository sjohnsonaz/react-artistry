import { addContext, block } from "@artistry/abstract";

export const GridStyle = addContext(() => {
    const Grid = block('grid', {

    });

    return {
        Grid
    };
});

// row($min-width = false) {
//     display: flex;

//     if $min-width {
//         flex-direction: column;

//         @media only screen and (min-width: $min-width) {
//             flex-direction: row;
//         }
//     } else {
//         flex-direction: row;
//     }
// }

// row-reverse($min-width = false) {
//     display: flex;

//     if $min-width {
//         flex-direction: column;

//         @media only screen and (min-width: $min-width) {
//             flex-direction: row-reverse;
//         }
//     } else {
//         flex-direction: row-reverse;
//     }
// }

// flex-column($span, $total, $min-width) {
//     flex-grow: 0;
//     flex-shrink: 0;
//     if $min-width {
//         width: 100%;

//         @media only screen and (min-width: $min-width) {
//             width: ((100% * $span)/ $total);
//         }
//     } else {
//         width: ((100% * $span)/ $total);
//     }
// }

// flex-offset($span, $total, $min-width) {
//     flex-grow: 0;
//     flex-shrink: 0;
//     if $min-width {
//         margin-inline-start: 0;

//         @media only screen and (min-width: $min-width) {
//             margin-inline-start: ((100% * $span) / $total);
//         }
//     } else {
//         margin-inline-start: ((100% * $span) / $total);
//     }
// }

// flex-grid($columns, $min-width = false)
//     .row
//         row($min-width)

//     .row-reverse
//         row-reverse($min-width)

//     .row,
//     .row-reverse
//         & > .col
//             flex-grow: 1;
//             flex-shrink: 1;
//             &.col-fixed
//                 --col-width: auto;
//                 --col-offset: 0;
//                 flex-grow: unset;
//                 flex-shrink: unset;
//                 width: var(--col-width);
//                 margin-inline-start: var(--col-offset);

//         for $span in (1..$columns)
//             & > .col-{$span}
//                 flex-column($span, $columns, $min-width)
//             & > .offset-{$span}
//                 flex-offset($span, $columns, $min-width)

// flex-grid(12)

// &,
// .grid >,
// .grid-12 >,
// .grid-xs-12 >
//     flex-grid(12)

// .grid-xs-12
//     & > 
//         flex-grid(12, $size-xs)

// .grid-sm-12
//     & > 
//         flex-grid(12, $size-sm)

// .grid-md-12
//     & > 
//         flex-grid(12, $size-md)

// .grid-lg-12
//     & > 
//         flex-grid(12, $size-lg);

// .grid-xl-12
//     & > 
//         flex-grid(12, $size-xl);

// .grid-space
//     & > .row,
//     & > .row-reverse
//         padding: 0 ($grid-spacing / 2)

//         & > .col,
//         & > [class^=col-]
//             padding: ($grid-spacing / 2)

//     & > .row:first-child
//     & > .row-reverse:last-child
//         & > .col,
//         & > [class^=col-]
//             padding-top: $grid-spacing

//     & > .row:last-child
//     & > .row-reverse:first-child
//         & > .col,
//         & > [class^=col-]
//             padding-bottom: $grid-spacing
