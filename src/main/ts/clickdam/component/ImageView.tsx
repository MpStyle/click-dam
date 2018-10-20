import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar/GridListTileBar";
import Icon from "@material-ui/core/Icon/Icon";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Image } from "../entity/Image";
import { ImageStatus } from "../entity/ImageStatus";

const styles = (theme: Theme) => createStyles({
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
})

const ImageView: React.StatelessComponent<ImageViewProps> = (props: ImageViewProps) => {
    const imageUrl = "file:///" + props.image.path + "/" + props.imageSize + "/" + props.image.name;

    return <GridListTile
        style={{ marginLeft: '5px', marginTop: '5px', backgroundColor: '#fff' }}
        data-image={props.image}
        className="image">

        <div style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            height: props.imageSize + 'px',
            width: (props.imageSize + 30) + 'px',
        }}>
        </div>

        <GridListTileBar
            title={props.image.originalFileName}
            actionIcon={
                <div>
                    <Tooltip title="Edit metadata">
                        <IconButton>
                            <Icon onClick={e => props.onEditClick(e)} className={props.classes.icon}>edit</Icon>
                        </IconButton>
                    </Tooltip>
                    {(!props.image.status || props.image.status == ImageStatus.NONE) &&
                        <Tooltip title="Offline image" onClick={(e) => { e.stopPropagation(); }}>
                            <IconButton>
                                <Icon className={props.classes.icon} >cloud_off</Icon>
                            </IconButton>
                        </Tooltip>
                    }
                    {props.image.status == ImageStatus.SCHEDULED_PUBLISHING &&
                        <Tooltip title="Scheduled publishing" onClick={(e) => { e.stopPropagation(); }}>
                            <IconButton>
                                <Icon className={props.classes.icon}>access_time</Icon>
                            </IconButton>
                        </Tooltip>
                    }
                    {props.image.status == ImageStatus.PUBLISHED &&
                        <Tooltip title="Published" onClick={(e) => { e.stopPropagation(); }}>
                            <IconButton>
                                <Icon className={props.classes.icon}>cloud_done</Icon>
                            </IconButton>
                        </Tooltip>
                    }
                </div>
            }>
        </GridListTileBar>
    </GridListTile>
}

export interface ImageViewProps {
    classes: {
        icon: any
    }
    image: Image
    imageSize: 200 | 300 | 400
    onEditClick: (e: React.MouseEvent<HTMLSpanElement>) => void
}

export default withStyles(styles)(ImageView);