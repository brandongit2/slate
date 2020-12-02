import styles from './ContentManagerArticle.module.scss';
import { Article } from '../../defs/global';

export default function ContentManagerArticle({
    article
}: {
    article: Article;
}) {
    return (
        <div className={styles.article}>
            <p style={{ gridColumn: '2 / 3' }}>
                {article.name}{' '}
                <span className={styles['article--author']}>
                    by {article.author}
                </span>
            </p>
        </div>
    );
}
