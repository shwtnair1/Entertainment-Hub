import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './SingleContent.module.css';

export default function SingleContent(props) {
    return (
        <Card className={styles.cardContainer}>
            <CardMedia
                component="img"
                height="300"
                image={`https://image.tmdb.org/t/p/w300` + props.poster}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.overview}
                </Typography>
                <div className={styles.contentFooter}>
                    <Typography variant="body3" color="text.secondary">
                        Release: {props.date}
                    </Typography>
                    <Typography variant="body3" color="text.secondary">
                        &#9733;{props.vote_average}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}