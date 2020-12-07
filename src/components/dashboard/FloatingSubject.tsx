import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ContentManagerSubject from './ContentManagerSubject';
import { Subject } from '../../defs/global';

export default function FloatingSubject({
    width,
    yOffset,
    subject
}: {
    width: number;
    yOffset: number;
    subject: Subject;
}) {
    const [yPos, setYPos] = useState(0);

    return createPortal(
        <div
            style={{
                position: 'fixed',
                top: `${yPos}px`,
                left: '0px',
                width: `${width}px`
            }}
            onMouseMove={(evt) => {
                setYPos(evt.clientY - yOffset);
            }}
        >
            <ContentManagerSubject subject={subject} />
        </div>,
        document.body
    );
}
