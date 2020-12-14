import {useContext, useState} from 'react';

import {ContentManagerContext} from '../contexts/contentManager';
import {Content} from '../defs/content';
import {sortedIndex} from '../misc/util';

export default function useReorder(elementPositions: number[]) {
    const [isReordering, setIsReordering] = useState(false);
    const {
        fns: {moveObjectDown, moveObjectUp}
    } = useContext(ContentManagerContext);

    function startReorder(evt: MouseEvent, object: Content) {
        setIsReordering(true);

        let prevMousePos = sortedIndex(elementPositions, evt.clientY);

        function handleMouseMove(evt: MouseEvent) {
            let curMousePos = sortedIndex(elementPositions, evt.clientY);
            if (curMousePos !== prevMousePos) {
                if (curMousePos - prevMousePos === 1) {
                    moveObjectDown(object);
                } else if (curMousePos - prevMousePos === -1) {
                    moveObjectUp(object);
                }
                prevMousePos = curMousePos;
            }
        }

        function stopReorder() {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', stopReorder);
            setIsReordering(false);
        }

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', stopReorder);
    }

    return {startReorder, isReordering};
}
