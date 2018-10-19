import { Icon, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import * as React from "react";
import { App } from '../book/App';
import { nowYYYYMMDDHHMM, timestampToYYYYMMDDHHMM, YYYYMMDDHHMMToTimestamp } from "../book/TimeUtils";
import { Image } from "../entity/Image";
import { ImageStatus } from "../entity/ImageStatus";

export class EditImageData extends React.Component<EditImageDataProps, EditImageDataState> {
    constructor(props: EditImageDataProps) {
        super(props)
        this.state = {
            image: this.props.image
        }
    }

    render() {
        const imageUrl = "file:///" + this.props.image.path + "/300/" + this.props.image.name

        return <div>
            <div id="header">
                <AppBar position="fixed">
                    <Toolbar>
                        <Button onClick={this.props.onBackToHomeClick} color="inherit">
                            <Icon>
                                arrow_back_ios
                        </Icon>
                        </Button>
                        <Typography variant="h6" color="inherit" noWrap>
                            {App.appName()}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <div id="body" className="edit-image-data-body" style={{ marginTop: '65px' }}>
                <div style={{ height: '340px', textAlign: 'center', backgroundImage: `url(${imageUrl})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundColor: 'white', marginBottom: '30px' }}>
                </div>
                <div style={{ maxWidth: '80%', minWidth: '40%', margin: '0px auto' }}>
                    <div>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ width: '100%' }}
                            id="standard-uncontrolled"
                            label="Width"
                            defaultValue={this.props.image.width}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ width: '100%' }}
                            id="standard-uncontrolled"
                            label="Height"
                            defaultValue={this.props.image.height}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <TextField id="description"
                            name="description"
                            label="Description"
                            style={{ width: '100%' }}
                            defaultValue={this.props.image.description}
                            onChange={this.onDescriptionChange}
                            multiline={true}></TextField>
                    </div>
                    <div>
                        <TextField
                            id="standard-select-currency-native"
                            select
                            label="Status"
                            style={{ width: '100%' }}
                            onChange={this.onStatusChange}
                            SelectProps={{
                                native: true
                            }}
                            margin="normal">
                            <option value={ImageStatus.NONE} selected={this.props.image.status == ImageStatus.NONE}></option>
                            <option value={ImageStatus.SCHEDULED_PUBLISHING} selected={this.props.image.status == ImageStatus.SCHEDULED_PUBLISHING}>Publish</option>
                        </TextField>
                    </div>
                    {
                        this.state.image.status == ImageStatus.SCHEDULED_PUBLISHING && <div>
                            <TextField id="scheduled-publish-date"
                                style={{ width: '100%' }}
                                name="scheduled-publish-date"
                                label="Scheduled publish date"
                                type="datetime-local"
                                onChange={this.onScheduledPublishDateChange}
                                defaultValue={this.state.image.scheduledPublishingDate ? timestampToYYYYMMDDHHMM(this.state.image.scheduledPublishingDate) : nowYYYYMMDDHHMM()}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </div>
                    }
                    {
                        this.state.image.status == ImageStatus.PUBLISHED && <div>
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                style={{ width: '100%' }}
                                id="standard-uncontrolled"
                                label="Published on"
                                defaultValue={this.props.image.publishDate}
                                margin="normal"
                            />
                        </div>
                    }

                    <div style={{ textAlign: 'right' }}>
                        <Button variant="contained" color="primary" onClick={() => {
                            this.props.onSaveClick(this.state.image)
                        }}>Save</Button>
                    </div>
                </div>
            </div>
        </div>

    }

    private onScheduledPublishDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            image: {
                ...this.state.image,
                scheduledPublishingDate: YYYYMMDDHHMMToTimestamp(e.currentTarget.value)
            }
        } as EditImageDataState)
    }

    private onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let key = e.currentTarget.value
        this.setState({
            image: {
                ...this.state.image,
                status: (ImageStatus as any)[key]
            }
        } as EditImageDataState)
    }

    private onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            image: {
                ...this.state.image,
                description: e.currentTarget.value
            }
        } as EditImageDataState)
    }
}

export interface EditImageDataProps {
    image: Image
    onBackToHomeClick: () => void
    onSaveClick: (image: Image) => void
}

interface EditImageDataState {
    image: Image
}