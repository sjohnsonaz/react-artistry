import { addContext, block } from "@artistry/abstract";
import { RowMixin } from "./Row.mixin";

export const RowStyle = addContext(() => {
    const Row = block('row',
        RowMixin({
        })
    );
    return {
        Row
    };
});