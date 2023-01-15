import { SideBlock } from "../SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@mui/material";
import { formatDate } from "../../helpers/formatDate";
import { Fragment } from "react";

export const CommentsBlock = ({ items, children, isLoading = true }) => {
  if (isLoading) {
    return (
      <List>
        {[...Array(5)].map((_, index) => (
          <ListItem alignItems="flex-start" key={index}>
            <ListItemAvatar>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Skeleton variant="text" height={25} width={120} />
              <Skeleton variant="text" height={18} width={230} />
            </div>
          </ListItem>
        ))}
      </List>
    );
  }
  
  return (
    <SideBlock title={items.length === 0 ? "Комментариев пока нет" : "Комментарии"}>
      <List>
        {items.map((item) => (
          <Fragment key={item._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={item.author.fullName} src={item.author.avatarUrl} />
              </ListItemAvatar>
              <div>
                <ListItemText primary={item.author.fullName} />
                <ListItemText secondary={item.text} />
                <Typography variant="caption" display="block" color="#878787" fontSize={10} gutterBottom>
                  {formatDate(item.createdAt)}
                </Typography>
              </div>
            </ListItem>
            
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
