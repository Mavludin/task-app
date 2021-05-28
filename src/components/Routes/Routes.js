import React from 'react'
import { Route, Switch } from "react-router-dom";
import { Assets } from '../../containers/Assets/Assets';
import { Clients } from '../../containers/Clients/Clients';
import { KBase } from '../../containers/KBase/KBase';
import { Settings } from '../../containers/Settings/Settings';
import { Staff } from '../../containers/Staff/Staff';
import { Tasks } from '../../containers/Tasks/Tasks';

export const Routes = ({
  setShowCraeteForm,
  setSelectedTask,
  setShowEditForm,
  showEditForm
}) => {
  return (
    <Switch>

    <Route exact path="/tasks">
      <Tasks
        setShowCraeteForm={setShowCraeteForm}
        setSelectedTask={setSelectedTask}
        setShowEditForm={setShowEditForm}
        showEditForm={showEditForm}
      />
    </Route>

    <Route exact path="/k-base">
      <KBase />
    </Route>

    <Route exact path="/staff">
      <Staff />
    </Route>

    <Route exact path="/clients">
      <Clients />
    </Route>

    <Route exact path="/settings">
      <Settings />
    </Route>

    <Route exact path="/assets">
      <Assets />
    </Route>

  </Switch>
  )
}
