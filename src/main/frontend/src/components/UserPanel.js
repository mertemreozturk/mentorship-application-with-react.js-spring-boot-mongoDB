import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import BarChartIcon from '@material-ui/icons/BarChart';
import MakeApplication from './MakeApplication'

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

const UserPanel =() => {
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
                    <Tab label="Süreçlerim" icon={<BarChartIcon />} {...a11yProps(0)} />
                    <Tab label="En Beğenilenler" icon={<FavoriteIcon />} {...a11yProps(1)} />
                    <Tab label="Mentor Ara" icon={<SearchIcon />} {...a11yProps(2)} />
                    <Tab label="Mentorluk Başvurusu Yap" icon={<HowToRegIcon />} {...a11yProps(3)} />
                    <Tab label="Item Six" icon={<ThumbDown />} {...a11yProps(4)} />
                    <Tab label="Item Seven" icon={<ThumbUp />} {...a11yProps(5)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                süreçlerim
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                mentor ara
            </TabPanel>
            <TabPanel value={value} index={3}>
                <MakeApplication/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Five
            </TabPanel>
        </div>
    );
}
export default UserPanel;