import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge/Badge';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Icon from '@material-ui/core/Icon/Icon';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import * as React from "react";
import { App } from '../book/App';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
});

const HomeHeader: React.StatelessComponent<HomeHeaderProps> = (props: HomeHeaderProps) => {
    return (
        <div className={props.classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography className={props.classes.title} variant="h6" color="inherit" noWrap>
                        {App.appName()}
                    </Typography>

                    <div className={props.classes.search}>
                        <div className={props.classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            onKeyUp={props.onSearchChange}
                            placeholder="Search…"
                            classes={{
                                root: props.classes.inputRoot,
                                input: props.classes.inputInput,
                            }}
                        />
                    </div>

                    <div className={props.classes.grow} />

                    <div className={props.classes.sectionDesktop}>
                        {props.showLoader && <CircularProgress color="inherit" />}
                        {props.showFolderOpenButton && <Button color="inherit" onClick={props.onFolderOpenClick}><Icon>folder_open</Icon></Button>}
                        {props.showRefreshButton && <Button color="inherit" onClick={props.onRefreshClick}>
                            {props.importedImageCount > 0 && <Badge badgeContent={props.importedImageCount} color="primary">
                                <Icon>refresh</Icon>
                            </Badge>}
                            {props.importedImageCount == 0 && <Icon>refresh</Icon>}
                        </Button>}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export interface HomeHeaderProps {
    classes: any
    showRefreshButton: boolean
    showFolderOpenButton: boolean
    showLoader: boolean
    importedImageCount: number
    onRefreshClick: () => void
    onFolderOpenClick: () => void
    onSearchChange: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export default withStyles(styles)(HomeHeader);