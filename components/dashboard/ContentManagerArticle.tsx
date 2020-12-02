import styles from './ContentManagerArticle.module.scss';
import { Article } from '../../defs/global';

export default function ContentManagerArticle({
    article
}: {
    article: Article;
}) {
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
                <button>
                    <span className="material-icons">delete</span>
                </button>
                <button>
                    <span className="material-icons">reorder</span>
                </button>
            </div>
        </div>
    );
}
