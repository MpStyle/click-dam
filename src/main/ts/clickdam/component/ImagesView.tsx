import { Button, Icon, IconButton } from '@material-ui/core';
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

const smallSize = 200
const mediumSize = 300
const largeSize = 400

const ImagesView: React.StatelessComponent<ImagesViewProps> = (props: ImagesViewProps) => {
    return <div>
        <div style={{ padding: '6px 10px', borderBottom: '1px solid black', backgroundColor: '#fff', overflow: 'hidden' }}>
            <div style={{ paddingTop: '20px', float: 'left' }}>
                {props.loadedImageCount} of {props.totalImageCount} images
            </div>
            <div style={{ float: 'right' }}>
                <IconButton style={{ padding: '10px' }} onClick={() => (props.onIconSizeClick(smallSize))}>
                    <Icon style={{ fontSize: '0.8em' }} color={props.imageSize == smallSize ? "primary" : 'action'}>
                        view_module
                    </Icon>
                </IconButton>
                <IconButton style={{ padding: '6px' }} onClick={() => (props.onIconSizeClick(mediumSize))}>
                    <Icon style={{ fontSize: '1.2em' }} color={props.imageSize == mediumSize ? "primary" : 'action'}>
                        view_module
                    </Icon>
                </IconButton>
                <IconButton style={{ padding: '6px' }} onClick={() => (props.onIconSizeClick(largeSize))}>
                    <Icon style={{ fontSize: '1.8em' }} color={props.imageSize == largeSize ? "primary" : 'action'}>
                        view_module
                    </Icon>
                </IconButton>
            </div>
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
    totalImageCount: number,
    imageSize: 200 | 300 | 400
    onIconSizeClick: (size: number) => void
}

export default withStyles(styles)(ImagesView);