import React, { useState, useEffect } from "react";
import { useMembers } from "../hooks/useMembers";

const MemberSlot = ({ member }) => {
  return (
    <div className="row">
      <p>{member.name}</p>
    </div>
  );
};

const MembersList = ({ members }) => {
  const hasItems = members && members.length > 0;
  let slots = [];

  if (hasItems) {
    slots = members.map((r, index) => <MemberSlot key={index} member={r} />);
  }

	 console.log("Members are ", members)

  return (
    <div className="record-list">
      {hasItems ? slots : <p> No members in this label</p>}
    </div>
  );
};

const Sidebar = ({ labelId }) => {
  const members = useMembers(labelId);

  return (
    <div className="">
      <h2>Members</h2>
      <MembersList members={members} />
    </div>
  );
};

export default Sidebar;
