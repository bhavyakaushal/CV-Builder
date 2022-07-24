import React from "react";

/* Styles */
import "./styles.scss";

function ProjectsCard({ id, title, description, skillId }) {
    return (
        <div className="card col-md-12 mb-3">
            <div className="card_header mt-2 mb-4">{title}</div>
            <div className="L4 card_desc mb-3">{description}</div>
            {skillId && (
                <div className="skills-container pr-2">
                    {Array.isArray(skillId) &&
                        skillId.map((temp_skill, i) => {
                            return <span>{temp_skill.skill}</span>;
                        })}
                </div>
            )}
        </div>
    );
}

export default React.memo(ProjectsCard);
