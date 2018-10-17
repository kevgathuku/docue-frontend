'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import DocActions from '../../../actions/DocActions';
import RoleActions from '../../../actions/RoleActions';
import DocStore from '../../../stores/DocStore';
import RoleStore from '../../../stores/RoleStore';
import DocumentPage from '../index.jsx';

jest.mock('sweetalert');
import swal from 'sweetalert';

describe('DocumentPage', function() {
  beforeEach(function() {
    sinon.stub(DocActions, 'deleteDoc').returns(true);
    sinon.stub(DocActions, 'fetchDoc').returns(true);
    sinon.stub(RoleActions, 'getRoles').returns(true);
  });

  afterEach(function() {
    DocActions.deleteDoc.restore();
    DocActions.fetchDoc.restore();
    RoleActions.getRoles.restore();
  });

  describe('Component Rendering', function() {
    it('renders the correct component', function() {
      expect(
        shallow(<DocumentPage params={{ id: 4 }} />).is('.container')
      ).toEqual(true);
      expect(
        shallow(<DocumentPage params={{ id: 4 }} />).find('.fixed-action-btn')
          .length
      ).toEqual(1);
    });

    it('calls componentDidMount', () => {
      sinon.spy(DocumentPage.prototype, 'componentDidMount');
      mount(<DocumentPage params={{ id: 4 }} />); // Mount the component
      expect(DocumentPage.prototype.componentDidMount.called).toBe(true);
      DocumentPage.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', () => {
      sinon.spy(DocumentPage.prototype, 'componentWillUnmount');
      let documentPage = mount(<DocumentPage params={{ id: 4 }} />); // Mount the component
      documentPage.unmount();
      expect(DocumentPage.prototype.componentWillUnmount.calledOnce).toBe(true);
      DocumentPage.prototype.componentWillUnmount.restore();
    });
  });

  describe('Component Functions', function() {
    window.Materialize = {};

    var docPage;

    beforeEach(function() {
      window.Materialize.toast = sinon.spy();
      docPage = mount(<DocumentPage params={{ id: 4 }} />);
    });

    afterEach(function() {
      docPage.unmount();
    });

    describe('handleDocumentFetch', function() {
      it('should correctly handle document fetch', function() {
        DocStore.getDoc = jest.fn();
        RoleStore.getRoles = jest.fn();
        let doc = {
          content: 'Hello from the other side',
          dateCreated: '2016-02-15T15:10:34.000Z',
          ownerId: {
            _id: 3,
            name: {
              first: 'Kevin',
              last: 'wkejbfekjwbf'
            }
          }
        };
        let roles = [
          {
            _id: '5816eeee66fe25b861af286d',
            accessLevel: 0,
            title: 'viewer'
          },
          {
            _id: '5816eeee66fe25b861af286e',
            accessLevel: 1,
            title: 'staff'
          },
          {
            _id: '5816eeee66fe25b861af286f',
            accessLevel: 2,
            title: 'admin'
          }
        ];
        DocStore.getDoc.mockReturnValue(doc);
        RoleStore.getRoles.mockReturnValue(roles);
        DocStore.setDoc(doc);
        // Should set the state correctly
        expect(DocStore.getDoc.mock.calls.length).toBeGreaterThan(0);
        expect(docPage.state().doc).toBe(doc);
        // Ensure the content is displayed
        expect(docPage.find('div.col.s10.offset-s1').text()).toInclude(
          doc.content
        );
      });
    });

    describe('handleDeleteResult', function() {
      it('should set state correctly on doc fetch', function() {
        sinon.spy(DocStore, 'getDocDeleteResult');
        let result = {
          statusCode: 204
        };
        DocStore.setDocDeleteResult(result);
        // Should respond correctly
        expect(DocStore.getDocDeleteResult.called).toBe(true);
        expect(swal.mock.calls[0][0]).toBe('Deleted!');
        // expect(browserHistory.push.mock.calls[0][0]).toBe('/dashboard');
        DocStore.getDocDeleteResult.restore();
      });
    });

    describe('onEditUpdate', function() {
      let doc = {
        content: 'Hello from the other side',
        dateCreated: '2016-02-15T15:10:34.000Z',
        ownerId: {
          _id: 3,
          name: {
            first: 'Kevin',
            last: 'wkejbfekjwbf'
          }
        }
      };
      it('should correctly update the state', function() {
        const instance = docPage.instance();
        sinon.spy(instance, 'onEditUpdate');
        instance.onEditUpdate(doc);
        expect(docPage.state().doc).toBe(doc);
        instance.onEditUpdate.restore();
      });
    });
  });
});
