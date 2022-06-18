import styles from './Avatar.module.css';

interface AvatarProps {
    image: string;
    hasBorder?: boolean;
}

export function Avatar({ image, hasBorder = true }: AvatarProps) {
    return (
        <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} src={image} />
    );
}