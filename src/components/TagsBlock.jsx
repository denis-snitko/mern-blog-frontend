import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
// import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import { Link } from "react-router-dom";

export const TagsBlock = ({ items }) => {
  
  return (
    <SideBlock title="Тэги">
      <List>
        {items.map((name, index) => (
          <Link
            key={index}
            style={{ textDecoration: "none", color: "black" }}
            to={`/tags/${name}`}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
