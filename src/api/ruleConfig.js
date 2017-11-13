/*
* 规则规则逻辑默认配置
* lhw 2017/4/24
* */
export default {
    "id": 49,
    "code": "11",
    "name": "规则规则逻辑默认",
    "types": "1",
    "smallTypes": "5",
    "enabled": false,
    "notes": "规则规则逻辑默认",
    "expression": "<p>package&nbsp;grade;\n</p><p>import&nbsp;com.deelon.ms.dlxd.risk.drools.models.employeeLoan.fact.EmployeeLoanFact;\n</p><p>import&nbsp;com.deelon.ms.dlxd.risk.drools.models.employeeLoan.fact.Summary;\n</p><p>import&nbsp;com.deelon.ms.dlxd.risk.drools.models.employeeLoan.fact.HitFact;\n</p><p>import&nbsp;com.deelon.ms.dlxd.risk.drools.models.employeeLoan.fact.HitFactDetail;\n</p><p>import&nbsp;com.deelon.ms.dlxd.risk.drools.models.employeeLoan.fact.HitRule;\n</p><p>import&nbsp;com.deelon.ms.dlxd.risk.drools.models.employeeLoan.fact.HitRuleDetail;\n</p><p>import&nbsp;com.deelon.ms.dlxd.risk.drools.models.employeeLoan.fact.Certification;\n</p><p>global&nbsp;com.deelon.ms.dlxd.risk.drools.models.employeeLoan.fact.EmployeeLoanRiskReport&nbsp;riskReport;\n</p><p>rule&nbsp;\"xxx-xxx-xxx-D\"\n</p><p>salience&nbsp;0\n</p><p>&nbsp;&nbsp;&nbsp;&nbsp;when\n</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$e&nbsp;:&nbsp;EmployeeLoanFact(&nbsp;)\n</p><p>&nbsp;&nbsp;&nbsp;&nbsp;then\n</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;retract($e);\n</p><p></p><p>end\n</p><p><br></p>",
    "weight": "11"
};
