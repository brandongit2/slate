import styles from './ContentManagerArticle.module.scss';
import { Content, Article } from '../../defs/global';

export default function ContentManagerArticle({
    article,
    removeObject
}: {
    article: Article;
    removeObject: (object: Content, from: string) => void;
}) {
    function removeSelf() {
        removeObject(article, article.parent);
    }

    return (
        <div className={styles.article}>
            <p className={styles['article__label']}>
                <span className={styles['label--name']}>{article.name}</span>{' '}
                <span className={styles['label--author']}>
                    by {article.author}
                </span>
            </p>
            <div className={styles['article__controls']}>
                <button>
                    <span className="material-icons">create</span>
                </button>
                <button onClick={removeSelf}>
                    <span className="material-icons">delete</span>
                </button>
                <button>
                    <span className="material-icons">reorder</span>
                </button>
            </div>
        </div>
    );
}
