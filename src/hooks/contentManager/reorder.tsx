import { MutableRefObject, useLayoutEffect, useRef } from 'react';

import { convertRemToPixels, sortedIndex } from '../../misc/util';

let elementPositions = [] as number[];
let curUuid: string;
let isReordering = false;

export function useReorder(
    moveUp: (uuid: string) => void,
    moveDown: (uuid: string) => void
) {
    const elRef = useRef(null);

    function updateYPositions() {
        if (!elRef.current || isReordering) return;

        elementPositions = [];
        for (let child of elRef.current.childNodes) {
            let boundingBox = child.getBoundingClientRect();
            elementPositions.push(boundingBox.top, boundingBox.bottom);
        }
        elementPositions.sort();

        if (elementPositions.length === 0) {
            elementPositions = [-100];
            return;
        }

        let temp = [
            elementPositions[0] - 0.5 * convertRemToPixels(1)
        ] as number[];
        for (let i = 1; i < elementPositions.length - 1; i += 2) {
            temp.push((elementPositions[i] + elementPositions[i + 1]) / 2);
        }
        temp.push(
            elementPositions[elementPositions.length - 1] +
                0.5 * convertRemToPixels(1)
        );
        elementPositions = temp;
    }

    useLayoutEffect(updateYPositions, []);

    function startReorder(
        evt: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        ref: MutableRefObject<any>,
        uuid: string
    ) {
        isReordering = true;

        let prevMousePos = sortedIndex(elementPositions, evt.clientY) - 1;
        curUuid = uuid;

        let boundingBox = ref.current.getBoundingClientRect();
        let offsetY = evt.clientY - boundingBox.top;

        let clone = ref.current.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.width = `${boundingBox.width}px`;
        clone.style.height = `${boundingBox.height}px`;
        document.body.appendChild(clone);

        function handleMouseMove(evt: MouseEvent) {
            ref.current.style.opacity = '0';
            clone.style.top = `${evt.clientY - offsetY}px`;
            clone.style.left = `${boundingBox.left}px`;

            let curMousePos = sortedIndex(elementPositions, evt.clientY) - 1;
            if (curMousePos !== prevMousePos) {
                if (curMousePos - prevMousePos === 1) moveUp(curUuid);
                if (curMousePos - prevMousePos === -1) moveDown(curUuid);
                prevMousePos = curMousePos;
            }
        }

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', () => {
            if (!elRef.current) return;

            window.removeEventListener('mousemove', handleMouseMove);
            clone.remove();
            ref.current.style.opacity = '1';

            isReordering = false;
        });
    }

    return { elRef, startReorder, updateYPositions };
}
