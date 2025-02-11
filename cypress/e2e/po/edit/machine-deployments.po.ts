import PagePo from '@/cypress/e2e/po/pages/page.po';
import ResourceDetailPo from '@/cypress/e2e/po/edit/resource-detail.po';
export default class MachineDeploymentsCreateEditPo extends PagePo {
  private static createPath(clusterId: string, nsName?: string, machineSetName?: string ) {
    const root = `/c/${ clusterId }/manager/cluster.x-k8s.io.machinedeployment`;

    return nsName && machineSetName ? `${ root }/${ nsName }/${ machineSetName }` : `${ root }/create`;
  }

  static goTo(path: string): Cypress.Chainable<Cypress.AUTWindow> {
    throw new Error('invalid');
  }

  constructor(clusterId = 'local', nsName?: string, machineSetName?: string) {
    super(MachineDeploymentsCreateEditPo.createPath(clusterId, nsName, machineSetName));
  }

  saveCreateForm(): ResourceDetailPo {
    return new ResourceDetailPo(this.self());
  }
}
