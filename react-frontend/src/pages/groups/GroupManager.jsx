import React, { useEffect, useState } from 'react';
import GroupForm from '../../components/group/GroupForm.jsx'
import { Button } from '@mui/material';
import GroupList from '../../components/group/GroupList.jsx'
import { listGroupsByUser } from '../../api/groupService.js'

const GroupManager = () => {

  const [groups, setGroups] = useState([]);
  const [editGroupId, setEditGroupId] = useState(null);


  useEffect(() => {
    onGroupCreated([])
  }, []);


  const onGroupCreated = async () => {
    setGroups(await listGroupsByUser());
  };


  const handleCreateGroup = (newGroup) => {
    //setGroups([...groups, { id: groups.length + 1, ...newGroup }]);
  };

  const handleEditClick = (groupId) => {
    setEditGroupId(groupId);
    console.log("editar:"+ groupId);
  };

  const handleDeleteClick = (groupId) => {
    //setGroups(groups.filter((group) => group.id !== groupId));
    console.log("elimiar:"+ groupId);
  };

  return (
    <div >
      <GroupForm onGroupCreated={onGroupCreated} />
      <div style={{ height: 400, width: '100%' }}>
      <GroupList
        groups={groups}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
      </div>
    </div>
  )
};

export default GroupManager;
