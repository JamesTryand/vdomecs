# vdomecs
a simple lightweight vdom ecs implementation in javascript  

The purpose of this is to have a set of lightweight tooling to use as part of a [jamstack](https://jamstack.org/)

The aim of this is to be able to compose performant website, by defining fragments ahead of time, and using metadata declarativly describe the structure of the site which can then be comopsed from those modules and fragments.

ECS has been chosen as a starting point to be able to add additional functionality to the system as a whole with the minimum amount of effort and refactoring.

VDom has been chosen such that we can work with the dom in a consistent and performant manner, and minimise dom reads.

This follows not only Jam stack, but also google's prpl pattern https://developers.google.com/web/fundamentals/performance/prpl-pattern/ 


# Ideas

* using web worker for background loading & preparing of resources
* having modules ( component + system ) able to be added on the fly
* using the 'shell' to handle 
* deffering attaching things 'below the fold' https://developers.google.com/web/tools/lighthouse/audits/offscreen-images

* use of CSP within javascript for the messagepassing.

* update the manager to automatically handle state (as a diff?)
* rather than iterating the entirity of a component, only apply on a given component wrt. to messages ... 
* include events as part of the Entity Component System - such that events:

* a 'navigate' component could ensure that a 'page refresh' performs a metadata site structure comparison, and then only loads in those modules that are necessary. 
* ... this could open up the 'site map' capability 

* as the id's for a given html component are unique, a way to differentiate those components is to have them identifiable (and potentially distinguishable - ie. a component that displays a user's name wouldn't need to be updated when navigating, but a generic table module would need to know how to differentiate between the content and thus change)
* use swapout (ie. when 'updating' rather create the new entity and swap the node (and ensure that the swapped out one is properly removed) )

* ensure that these kinds of functionalities are then swapped out

* using string based identities such that heirarchy can be represented.