'use strict';
const sinon = require('sinon');
const IControlUtil = require('../../lib/IControlUtil');
const IControlUtilSpecStub = require('../stub/IControlUtilSpecStub.json');

describe('iControl REST API Client Test Spec - Normal Cases',  () => {

    //Create base test IControl Instance
    let IControlClient = new IControlUtil({
        host: '127.0.0.1',
        ca: 'Some Fake Contents',
        token: 'SomeCA', //Authorization Token for Basic Auth
        output: true //Set to true if you want to see output
    });

    let testPath = '/mgmt/tm/net/bwc/policy';

    let testBody = {
        key : "value"
    }

    describe('List / Get  F5 iControl Collection',  () => {

        let listCollectionStub = sinon.stub(IControlClient, 'list');
        listCollectionStub.withArgs(testPath).resolves(IControlUtilSpecStub.ListCollectionStubResponse);

        it('Get F5 iControl Collection Normal Case', (done) => {

            IControlClient.list(testPath).then((res) => {
                expect(listCollectionStub.called).to.be.true;
                expect(res).to.be.eql(IControlUtilSpecStub.ListCollectionStubResponse);
                done();
            })
            .catch(done);

        });

        after(() => {
            listCollectionStub.restore();
        });


    });

    describe('Create a F5 iControl Collection',  () => {
        let createCollectionStub = sinon.stub(IControlClient, 'create');
        createCollectionStub.withArgs(testPath,testBody).resolves(IControlUtilSpecStub.CollectionStubResponse);

        it('Create F5 iControl Collection Normal Case', (done) => {

            IControlClient.create(testPath,testBody).then((res) => {
                expect(createCollectionStub.called).to.be.true;
                expect(res).to.be.eql(IControlUtilSpecStub.CollectionStubResponse);
                done();
            })
            .catch(done);

        });

        after(() => {
            createCollectionStub.restore();
        });
    });

    describe('Update a F5 iControl Collection',  () => {
        let updateCollectionStub = sinon.stub(IControlClient, 'update');
        updateCollectionStub.withArgs(testPath,testBody).resolves(IControlUtilSpecStub.CollectionStubResponse);

        it('Update F5 iControl Collection Normal Case', (done) => {

            IControlClient.update(testPath,testBody).then((res) => {
                expect(updateCollectionStub.called).to.be.true;
                expect(res).to.be.eql(IControlUtilSpecStub.CollectionStubResponse);
                done();
            })
            .catch(done);

        });

        after(() => {
            updateCollectionStub.restore();
        });
    });


    describe('Delete a F5 iControl Collection',  () => {
        let deleteCollectionStub = sinon.stub(IControlClient, 'delete');
        deleteCollectionStub.withArgs(testPath).resolves(undefined);

        it('Update F5 iControl Collection Normal Case', (done) => {

            IControlClient.delete(testPath).then((res) => {
                expect(res).to.be.undefined;
                done();
            })
            .catch(done);
        });

        after(() => {
            deleteCollectionStub.restore();
        });
    });
});