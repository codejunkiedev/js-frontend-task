import React, { useLayoutEffect, useRef, useState } from "react"
import "./contactList.css"
import ContactsStore from "../../stores/ContactsStore"
import { Grid, Card, Avatar, IconButton, Typography, CardContent } from "@mui/material"
import { makeStyles } from "@mui/styles"
import SortableList, { SortableItem } from "react-easy-sort"
import { arrayMoveImmutable } from "array-move"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import StarIcon from "@mui/icons-material/Star"

import contact1 from "../../stores/assets/contact_01.png"
import contact2 from "../../stores/assets/contact_02.png"
import contact3 from "../../stores/assets/contact_03.png"
import contact4 from "../../stores/assets/contact_04.png"
import contact5 from "../../stores/assets/contact_05.png"
import contact6 from "../../stores/assets/contact_06.png"
import contact7 from "../../stores/assets/contact_07.png"
import contact8 from "../../stores/assets/contact_08.png"
import contact9 from "../../stores/assets/contact_09.png"
import contact10 from "../../stores/assets/contact_10.png"
import contact11 from "../../stores/assets/contact_11.png"
import contact12 from "../../stores/assets/contact_12.png"

interface IContactList {
  className?: string
}
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    userSelect: "none"
  },

  dragged: {
    // transform: "rotate(-60deg)"
    transform: {
      rotate: "-30deg"
    }

    // boxShadow: "0px 6px 6px -3px #fff, 0px 10px 14px 1px #fff, 0px 4px 18px 3px #fff",
    // "& button": {
    //   opacity: 0
    // }
  }
})

const ContactList: React.FunctionComponent<IContactList> = (props) => {
  const classes = useStyles()
  const contactsStore = ContactsStore.useStore()
  const [characters, updateCharacters] = useState(contactsStore.contacts)
  const [isClicked, setIsClicked] = useState(0)
  const [imglist, updateImglist] = useState([
    contact1,
    contact2,
    contact3,
    contact4,
    contact5,
    contact6,
    contact7,
    contact8,
    contact9,
    contact10,
    contact11,
    contact12
  ])

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    updateCharacters((array) => arrayMoveImmutable(array, oldIndex, newIndex))
  }
  const StarClick = (name) => {
    characters.map((item) =>
      item.name === name ? (item.favourite === false ? (item.favourite = true) : (item.favourite = false)) : item
    )
    setIsClicked(isClicked + 1)
  }
  return (
    <div className={props.className}>
      <h1 style={{ color: "#fff", textAlign: "center" }}>CodeJunkie Assessment by Awais</h1>
      <SortableList onSortEnd={onSortEnd} className={classes.root} draggedItemClassName={classes.dragged}>
        <div className="characters">
          <Grid spacing={2} container>
            {characters.map(({ name, pic, mob, favourite }) => {
              return (
                <SortableItem key={name}>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                    <Card style={{ borderRadius: "15px" }}>
                      <IconButton
                        onClick={() => StarClick(name)}
                        style={{ display: "block", marginLeft: "auto", marginRight: "0" }}
                      >
                        {isClicked !== 0 && favourite ? <StarIcon /> : <StarBorderIcon />}
                      </IconButton>

                      <CardContent>
                        <Grid spacing={2} container>
                          <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Typography
                              variant="subtitle2"
                              gutterBottom
                              component="div"
                              style={{ fontWeight: "bold", textAlign: "left" }}
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              gutterBottom
                              component="div"
                              style={{ fontWeight: "590", fontSize: "18px", textAlign: "left", color: "#999999" }}
                            >
                              {mob}
                            </Typography>
                          </Grid>
                          <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                            {/* <img src={require(`../../stores/assets/${pic}.png`)} /> */}
                            {imglist.map((x) => (pic === x ? <Avatar src={x} sx={{ width: 60, height: 60 }} /> : null))}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </SortableItem>
              )
            })}
          </Grid>
        </div>
      </SortableList>
    </div>
  )
}

ContactList.defaultProps = {
  className: "contact-list"
}
export default ContactList
