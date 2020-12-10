import React, {useContext} from 'react';

import ContentManagerArticle from './ContentManagerArticle';
import ContentManagerFolder from './ContentManagerFolder';
import {ContentManagerContext} from '../../contexts/contentManager';

export default function ContentManagerSubjectChildren({
    children,
    isOpen
}: {
    children: string[];
    isOpen: boolean;
}) {
    const {loadedContent, loadContent} = useContext(ContentManagerContext);

    return (
        <div>
            {children.map((uuid) => {
                let content = loadedContent.find((c) => c.uuid === uuid);
                if (typeof content === 'undefined') {
                    if (isOpen) loadContent(uuid);
                    return null;
                } else if (content.type === 'folder') {
                    return <ContentManagerFolder key={uuid} folder={content} />;
                } else if (content.type === 'article') {
                    return (
                        <ContentManagerArticle key={uuid} article={content} />
                    );
                }
            })}
        </div>
    );
}
