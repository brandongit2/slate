import React, {useContext, useEffect, useRef} from 'react';

import ContentManagerArticle from './ContentManagerArticle';
import ContentManagerFolder from './ContentManagerFolder';
import {ContentManagerContext} from '../../contexts/contentManager';
import useReorder from '../../hooks/reorder';

let elementPositions = [] as number[];

export default function ContentManagerSubjectContent({
    content,
    isOpen
}: {
    content: string[];
    isOpen: boolean;
}) {
    const {loadedContent, loadContent} = useContext(ContentManagerContext);
    const childrenRef = useRef(null);

    function updateYPositions(force = false) {
        if ((!childrenRef.current || isReordering) && !force) return;

        elementPositions = [];
        for (let child of childrenRef.current.childNodes) {
            let boundingBox = child.getBoundingClientRect();
            elementPositions.push(boundingBox.bottom);
        }
        elementPositions.pop();
        elementPositions.sort();

        if (elementPositions.length === 0) {
            elementPositions = [-100];
        }
    }
    useEffect(updateYPositions, []);

    const {isReordering, startReorder} = useReorder(elementPositions);

    return (
        <>
            <div ref={childrenRef}>
                {content.map((uuid) => {
                    let content = loadedContent.find((c) => c.uuid === uuid);
                    if (typeof content === 'undefined') {
                        if (isOpen) loadContent(uuid);
                        return null;
                    } else if (content.type === 'folder') {
                        return (
                            <ContentManagerFolder
                                key={uuid}
                                folder={content}
                                isReordering={isReordering}
                                startReorder={startReorder}
                                updateYPositions={updateYPositions}
                            />
                        );
                    } else if (content.type === 'article') {
                        return (
                            <ContentManagerArticle
                                key={uuid}
                                article={content}
                                isReordering={isReordering}
                                startReorder={startReorder}
                                updateYPositions={updateYPositions}
                            />
                        );
                    }
                })}
            </div>
        </>
    );
}
