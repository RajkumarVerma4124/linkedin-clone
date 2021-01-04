import React from 'react'
import "../styles/Widgets.css"
import InfoIcon from "@material-ui/icons/Info"
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

function Widgets() {
    const newsArticle = (heading, subtitle) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
                <FiberManualRecordIcon/>
            </div>
            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    )

    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>LinkedIn News</h2>
                <InfoIcon/>
            </div>
            {newsArticle("Congress says no money for Americans", "Still a bad idea says Mitch McConnell")}
            {newsArticle("Running low on toilet paper?", "Experts say buy more GO NOW!")}
            {newsArticle("Monolith in desert flies away", "No joke")}
        </div>
    )
}

export default Widgets
