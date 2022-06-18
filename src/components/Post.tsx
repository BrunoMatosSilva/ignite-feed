import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface PostProps {
    author: {
        name: string;
        avatarUrl: string;
        role: string;
    },
    content: {
        type: string;
        content: string;
    }[]

    publishedAt: Date;
}


export function Post({ author, content, publishedAt }: PostProps) {
    const [comments, setComments] = useState([
        'Post muito bacana, hein?!',
    ])

    const [newCommentText, setNewCommentText] = useState('');

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:MM'h'", {
        locale: ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment(event: any) {
        event?.preventDefault()
        setComments([
            ...comments,
            newCommentText
        ]);

        setNewCommentText('');
    }

    function handleNewCommentChange(event: any) {
        event?.target.setCustomValidity('')
        setNewCommentText(event?.target.value)
    }

    function deleteComment(commentToDelete: any) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        });

        setComments(commentsWithoutDeletedOne);
    }

    function handleNewCommentInvalid(event: any) {
        event?.target.setCustomValidity('Campo obrigatorio não preenchido!')
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar image={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    name="comment"
                    placeholder="Deixe um comentário"
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required={true}
                />

                <footer>
                    <button disabled={isNewCommentEmpty} type="submit">Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (<Comment key={comment} content={comment} onDeleteComment={deleteComment} />)
                })}
            </div>
        </article>
    );
}