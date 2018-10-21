import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar/GridListTileBar";
import Icon from "@material-ui/core/Icon/Icon";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as React from "react";
import { Image } from "../entity/Image";
import { ImageStatus } from "../entity/ImageStatus";

const styles = (theme: Theme) => createStyles({
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
})

class ImageView extends React.Component<ImageViewProps, ImageViewState> {
    private static readonly ITEM_HEIGHT = 48;

    constructor(props: ImageViewProps) {
        super(props)
        this.state = {
            anchorEl: null
        } as ImageViewState
    }

    render() {
        const imageUrl = "file:///" + this.props.image.path + "/" + this.props.imageSize + "/" + this.props.image.name;

        return <GridListTile
            style={{ marginLeft: '5px', marginTop: '5px', backgroundColor: '#fff' }}
            data-image={this.props.image}
            className="image">

            <div style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                height: this.props.imageSize + 'px',
                width: (this.props.imageSize + 30) + 'px',
            }}>
            </div>

            <GridListTileBar
                title={this.props.image.originalFileName}
                actionIcon={
                    <div>
                        {(!this.props.image.status || this.props.image.status == ImageStatus.NONE) &&
                            <Tooltip title="Offline image" onClick={(e) => { e.stopPropagation(); }}>
                                <IconButton>
                                    <Icon className={this.props.classes.icon} >cloud_off</Icon>
                                </IconButton>
                            </Tooltip>
                        }
                        {this.props.image.status == ImageStatus.SCHEDULED_PUBLISHING &&
                            <Tooltip title="Scheduled publishing" onClick={(e) => { e.stopPropagation(); }}>
                                <IconButton>
                                    <Icon className={this.props.classes.icon}>access_time</Icon>
                                </IconButton>
                            </Tooltip>
                        }
                        {this.props.image.status == ImageStatus.PUBLISHED &&
                            <Tooltip title="Published" onClick={(e) => { e.stopPropagation(); }}>
                                <IconButton>
                                    <Icon className={this.props.classes.icon}>cloud_done</Icon>
                                </IconButton>
                            </Tooltip>
                        }
                        <Tooltip title="Edit metadata">
                            <IconButton
                                aria-label="More"
                                aria-owns={Boolean(this.state.anchorEl) ? 'image-menu' : null}
                                aria-haspopup="true"
                                onClick={this.openImageMenu.bind(this)}>
                                <MoreVertIcon className={this.props.classes.icon} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="image-menu"
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.closeImageMenu.bind(this)}
                            PaperProps={{
                                style: {
                                    maxHeight: ImageView.ITEM_HEIGHT * 4.5,
                                    width: 200,
                                },
                            }}>
                            <MenuItem onClick={this.props.onEditClick}>
                                <ListItemIcon>
                                    <Icon>edit</Icon>
                                </ListItemIcon>
                                <ListItemText inset primary="Edit" />
                            </MenuItem>
                            <MenuItem onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                                this.props.onDeleteClick()
                                this.closeImageMenu(e)
                            }}>
                                <ListItemIcon>
                                    <Icon>delete</Icon>
                                </ListItemIcon>
                                <ListItemText inset primary="Delete" />
                            </MenuItem>
                        </Menu>
                    </div>
                }>
            </GridListTileBar>
        </GridListTile>
    }

    private openImageMenu(e: React.MouseEvent<HTMLDivElement>) {
        this.setState({
            ...this.state,
            anchorEl: e.currentTarget
        } as ImageViewState)
    }

    private closeImageMenu(e: React.MouseEvent<HTMLDivElement>) {
        this.setState({
            ...this.state,
            anchorEl: null
        } as ImageViewState)
    }
}

export interface ImageViewProps {
    classes: {
        icon: any
    }
    image: Image
    imageSize: 200 | 300 | 400
    onEditClick: () => void
    onDeleteClick: () => void
}

interface ImageViewState {
    anchorEl: HTMLElement
}

export default withStyles(styles)(ImageView);