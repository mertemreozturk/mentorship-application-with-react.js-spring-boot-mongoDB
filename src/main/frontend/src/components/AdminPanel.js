import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Box from '@material-ui/core/Box';
import Applies from "./Applies";
import AddNewTopic from "./AddNewTopic";
import DeleteTopic from "./DeleteTopic";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const AdminPanel =() => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

        return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                    centered
                >
                    <Tab label="Başvurular" icon={<HowToRegIcon />} {...a11yProps(0)} />
                    <Tab label="En Beğenilenler" icon={<FavoriteIcon />} {...a11yProps(1)} />
                    <Tab label="Yeni Konu Oluştur" icon={<AddCircleIcon />} {...a11yProps(2)} />
                    <Tab label="Bir Konuyu Sil" icon={<DeleteIcon />} {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Applies/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                en beğenilen fazlar
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AddNewTopic/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <DeleteTopic/>
            </TabPanel>
        </div>
    );
}
export default AdminPanel;