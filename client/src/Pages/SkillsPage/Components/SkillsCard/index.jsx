import React from "react";
import classnames from "classnames";

/* Styles */
import "./styles.scss";

/* Images/SVG */
import StarImg from "../../../../Assets/SVG/star.svg";

function SkillsCard({ id, skill, rating }) {
    return (
        <div className="card col-md-12 mb-3">
            <div className="card_header L3 mb-1">{skill}</div>
            <div className="card_rating">
                {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;

                    const isActive = ratingValue <= (rating || 0);

                    return (
                        <label key={i}>
                            <img
                                className={classnames("mr-1", {
                                    ["active"]: isActive
                                })}
                                src={StarImg}
                                alt="Star"
                            />
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

export default React.memo(SkillsCard);
