import GridList from '@material-ui/core/GridList';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import * as React from "react";
import { Image } from "../entity/Image";
import { ImageViewContainer } from "./ImageViewContainer";

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
})

const ImagesView: React.StatelessComponent<ImagesViewProps> = (props: ImagesViewProps) => {
    return <div>
        <div style={{ padding: '6px 10px', borderBottom: '1px solid black', backgroundColor: '#fff' }}>
            {props.loadedImageCount} of {props.totalImageCount} images
        </div>
        <GridList cellHeight={250}
            style={{ margin: '0px auto' }}>
            {props.images.map((image: Image) => {
                return <ImageViewContainer
                    image={image}
                    key={'image_' + image.id} />
            })}
        </GridList>
    </div>
}

export interface ImagesViewProps {
    images: Image[]
    loadedImageCount: number,
    totalImageCount: number
}

export default withStyles(styles)(ImagesView);