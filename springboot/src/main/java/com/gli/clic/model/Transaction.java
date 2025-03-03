package com.gli.clic.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "T_CK_CP_TXN") 
public class Transaction {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "TXN_ID")
    private Long txnId;

    @Column(name = "TXN_NODE")
    private String txnNode;

    @Column(name = "TXN_TYPE")
    private String txnType;

    @Column(name = "TXN_STATE")
    private String txnState;

    @Column(name = "TXN_SERVICE_REF")
    private String txnServiceRef;

    @Column(name = "TXN_PARAM", columnDefinition = "TEXT")
    private String txnParam;

    @Column(name = "TXN_REQ", columnDefinition = "TEXT")
    private String txnReq;

    @Column(name = "TXN_DT_REQ")
    @Temporal(TemporalType.TIMESTAMP)
    private Date txnDtReq;

    @Column(name = "TXN_RESP", columnDefinition = "TEXT")
    private String txnResp;

    @Column(name = "TXN_RESP_CODE")
    private String txnRespCode;

    @Column(name = "TXN_DT_RESP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date txnDtResp;

    @Column(name = "TXN_STATUS")
    private String txnStatus;

    @Column(name = "TXN_DT_CREATE", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date txnDtCreate;

    @Column(name = "TXN_UID_CREATE", updatable = false)
    private String txnUidCreate;

    @Column(name = "TXN_DT_LUPD")
    @Temporal(TemporalType.TIMESTAMP)
    private Date txnDtLupd;

    @Column(name = "TXN_UID_LUPD")
    private String txnUidLupd;

    @PrePersist
    protected void onCreate() {
        txnDtCreate = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        txnDtLupd = new Date();
    }
    
	
    public Long getTxnId() {
		return txnId;
	}

	public void setTxnId(Long txnId) {
		this.txnId = txnId;
	}

	public String getTxnNode() {
		return txnNode;
	}

	public void setTxnNode(String txnNode) {
		this.txnNode = txnNode;
	}

	public String getTxnType() {
		return txnType;
	}

	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}

	public String getTxnState() {
		return txnState;
	}

	public void setTxnState(String txnState) {
		this.txnState = txnState;
	}

	public String getTxnServiceRef() {
		return txnServiceRef;
	}

	public void setTxnServiceRef(String txnServiceRef) {
		this.txnServiceRef = txnServiceRef;
	}

	public String getTxnParam() {
		return txnParam;
	}

	public void setTxnParam(String txnParam) {
		this.txnParam = txnParam;
	}

	public String getTxnReq() {
		return txnReq;
	}

	public void setTxnReq(String txnReq) {
		this.txnReq = txnReq;
	}

	public Date getTxnDtReq() {
		return txnDtReq;
	}

	public void setTxnDtReq(Date txnDtReq) {
		this.txnDtReq = txnDtReq;
	}

	public String getTxnResp() {
		return txnResp;
	}

	public void setTxnResp(String txnResp) {
		this.txnResp = txnResp;
	}

	public String getTxnRespCode() {
		return txnRespCode;
	}

	public void setTxnRespCode(String txnRespCode) {
		this.txnRespCode = txnRespCode;
	}

	public Date getTxnDtResp() {
		return txnDtResp;
	}

	public void setTxnDtResp(Date txnDtResp) {
		this.txnDtResp = txnDtResp;
	}

	public String getTxnStatus() {
		return txnStatus;
	}

	public void setTxnStatus(String txnStatus) {
		this.txnStatus = txnStatus;
	}

	public Date getTxnDtCreate() {
		return txnDtCreate;
	}

	public void setTxnDtCreate(Date txnDtCreate) {
		this.txnDtCreate = txnDtCreate;
	}

	public String getTxnUidCreate() {
		return txnUidCreate;
	}

	public void setTxnUidCreate(String txnUidCreate) {
		this.txnUidCreate = txnUidCreate;
	}

	public Date getTxnDtLupd() {
		return txnDtLupd;
	}

	public void setTxnDtLupd(Date txnDtLupd) {
		this.txnDtLupd = txnDtLupd;
	}

	public String getTxnUidLupd() {
		return txnUidLupd;
	}

	public void setTxnUidLupd(String txnUidLupd) {
		this.txnUidLupd = txnUidLupd;
	}


}
