export default {
  'obj-name': 'virtual-server',
  'obj-help': 'Create a Virtual Server',
  'obj-lineage': 'cmroot.slb',
  'obj-occurences': 'multi',
  'obj-json-suffix': '-list',
  'obj-indexing': 'string',
  'obj-module-prompt': 'slb vserver',
  'obj-disp-after': 'waf.template',
  'obj-module-dont-display-value-in-prompt': true,
  'obj-stats-oid': '2012',
  'obj-lineage-full': 'slb.virtual-server',
  'axapi': '/axapi/v3/slb/virtual-server/{name}',
  'properties': {
    'name': {
      'type': 'string',
      'format': 'string-rlx',
      'object-key': true,
      'minLength': '1',
      'maxLength': '127',
      'description': 'SLB Virtual Server Name',
      'example-default': 'vs1',
      'src-name': 'name'
    },
    'ipv6-address': {
      'type': 'ipv6-address',
      'condition': 'name',
      'modify-ineligible': true,
      'description': 'IPV6 address',
      'format': 'ipv6-address',
      'src-name': 'ipv6-address'
    },
    'ip-address': {
      'type': 'ipv4-address',
      'condition': 'name',
      'description': 'IP Address',
      'modify-ineligible': true,
      'm-exclusion': 'ipv6-address',
      'after-cb-dup-ip-check': true,
      'format': 'ipv4-address',
      'src-name': 'ip-address'
    },
    'netmask': {
      'type': 'ipv4-netmask-brief',
      'condition': 'ip-address',
      'link-next-fwd': 'acl',
      'example-default': '255.255.255.0',
      'modify-ineligible': true,
      'description': 'IP subnet mask',
      'format': 'ipv4-netmask-brief',
      'src-name': 'netmask'
    },
    'ipv6-acl': {
      'type': 'string',
      'minLength': '1',
      'maxLength': '31',
      'condition': 'ipv6-address',
      'obj-lineage-full': 'ipv6.access-list',
      '$ref': '/axapi/v3/ipv6/access-list',
      'modify-ineligible': true,
      'example-default': 'ipv6.access-list',
      'description': 'ipv6 acl name (ipv6 acl name)',
      'format': 'string',
      'src-name': 'ipv6-acl'
    },
    'acl': {
      'type': 'dummy',
      'condition': 'ip-address',
      'example-default': '0',
      'description': 'acl id',
      'format': 'dummy',
      'src-name': 'acl'
    },
    'acl-id': {
      'type': 'number',
      'minimum': '1',
      'maximum': '199',
      'condition': 'acl',
      'obj-lineage-full': 'access-list.standard, access-list.extended',
      '$ref': '/axapi/v3/access-list/standard, access-list/extended',
      'modify-ineligible': true,
      'example-default': '1',
      'description': 'acl id',
      'format': 'number',
      'src-name': 'acl-id'
    },
    'acl-name': {
      'type': 'string',
      'minLength': '1',
      'maxLength': '16',
      'condition': 'acl',
      'alias': 'acl-name',
      'obj-lineage-full': 'ip.access-list',
      '$ref': '/axapi/v3/ip/access-list',
      'modify-ineligible': true,
      'example-default': 'aclname1',
      'description': 'Access List name (IPv4 Access List Name)',
      'format': 'string',
      'src-name': 'name'
    },
    'use-if-ip': {
      'type': 'number',
      'format': 'flag',
      'plat-pos-list': 'soft-ax',
      'm-exclusion': 'ip-address, ipv6-address',
      'condition': 'name',
      'description': 'Use Interface IP',
      'src-name': 'use-if-ip'
    },
    'ethernet': {
      'type': 'number',
      'format': 'interface',
      'plat-pos-list': 'soft-ax',
      'condition': 'use-if-ip',
      'description': 'Ethernet interface',
      'src-name': 'ethernet'
    },
    'description': {
      'type': 'string',
      'format': 'string-rlx',
      'minLength': '1',
      'maxLength': '63',
      'example-default': 'A default Virtual-Server',
      'description': 'Create a description for VIP (Description for VIP)',
      'src-name': 'description'
    },
    'enable-disable-action': {
      'type': 'string',
      'not-allowed-in-no': true,
      'enum': [
        'enable',
        'disable',
        'disable-when-all-ports-down',
        'disable-when-any-port-down'
      ],
      'enumMap': [{
        'enable': '\'Enable Virtual Server (default)'
      }, {
        'disable': '\'Disable Virtual Server'
      }, {
        'disable-when-all-ports-down': '\'Disable Virtual Server when all member ports are down'
      }, {
        'disable-when-any-port-down': '\'Disable Virtual Server when any member port is down'
      }],
      'description': '',
      'default': 'enable',
      'format': 'enum',
      'src-name': 'enable-disable-action'
    },
    'redistribution-flagged': {
      'type': 'number',
      'format': 'flag',
      'example-default': '0',
      'description': 'Flag VIP for special redistribution handling',
      'src-name': 'redistribution-flagged'
    },
    'arp-disable': {
      'type': 'number',
      'format': 'flag',
      'example-default': '0',
      'description': 'Disable Respond to Virtual Server ARP request',
      'src-name': 'arp-disable'
    },
    'template': {
      'type': 'dummy',
      'example-default': '1',
      'description': 'Apply template to virtual server',
      'format': 'dummy',
      'src-name': 'template'
    },
    'template-policy': {
      'type': 'string',
      'format': 'string-rlx',
      'minLength': '1',
      'maxLength': '63',
      'condition': 'template',
      'description': 'Policy template (Policy template name)',
      'obj-lineage-full': 'slb.template.policy',
      '$ref': '/axapi/v3/slb/template/policy',
      'example-default': 'slb.template.policy',
      'alias': 'template-policy',
      'src-name': 'policy'
    },
    'template-virtual-server': {
      'type': 'string',
      'condition': 'template',
      'description': 'Virtual server template (Virtual server template name)',
      'minLength': '1',
      'maxLength': '63',
      'obj-lineage-full': 'slb.template.virtual-server',
      '$ref': '/axapi/v3/slb/template/virtual-server',
      'example-default': 'slb.template.virtual-server',
      'alias': 'template-virtual-server',
      'format': 'string',
      'src-name': 'virtual-server'
    },
    'template-logging': {
      'type': 'string',
      'condition': 'template',
      'description': 'NAT Logging template (NAT Logging template name)',
      'minLength': '1',
      'maxLength': '63',
      'obj-lineage-full': 'ip.nat.template.logging',
      '$ref': '/axapi/v3/ip/nat/template/logging',
      'alias': 'template-logging',
      'format': 'string',
      'src-name': 'logging'
    },
    'template-scaleout': {
      'type': 'string',
      'minLength': '1',
      'maxLength': '63',
      'condition': 'template',
      'alias': 'template-scaleout',
      'description': 'Scaleout template (Scaleout template name)',
      'format': 'string',
      'src-name': 'scaleout'
    },
    'stats-data-action': {
      'type': 'string',
      'enum': [
        'stats-data-enable',
        'stats-data-disable'
      ],
      'enumMap': [{
        'stats-data-enable': '\'Enable statistical data collection for virtual server'
      }, {
        'stats-data-disable': '\'Disable statistical data collection for virtual server'
      }],
      'description': '',
      'default': 'stats-data-enable',
      'not-allowed-in-no': true,
      'format': 'enum',
      'src-name': 'stats-data-action'
    },
    'extended-stats': {
      'type': 'number',
      'format': 'flag',
      'example-default': '0',
      'description': 'Enable extended statistics on virtual server',
      'src-name': 'extended-stats'
    },
    'vrid': {
      'type': 'number',
      'minimum': '1',
      'maximum': '31',
      'minimum-partition': '1',
      'maximum-partition': '7',
      'example-default': '1',
      'description': 'Join a vrrp group (Specify ha VRRP-A vrid)',
      'format': 'number',
      'src-name': 'vrid'
    },
    'port-list': {
      'obj-name': 'port',
      'obj-help': 'Virtual Port',
      'obj-lineage': 'cmroot.slb.virtual-server',
      'obj-occurences': 'multi',
      'obj-json-suffix': '-list',
      'obj-module-prompt': 'vport',
      'obj-module-dont-display-value-in-prompt': true,
      'obj-stats-oid': '2003',
      'obj-indexing': 'number',
      'obj-key-count': '2',
      'obj-lineage-full': 'slb.virtual-server.port',
      'axapi': '/axapi/v3/slb/virtual-server/{name}/port/{port-number}+{protocol}',
      'properties': {
        'port-number': {
          'type': 'number',
          'object-key': true,
          'alias': 'port-number',
          'minimum': '0',
          'maximum': '65534',
          'description': 'Port',
          'format': 'number',
          'src-name': 'port'
        },
        'protocol': {
          'type': 'string',
          'object-key': true,
          'condition': 'port-number',
          'enum': [
            'tcp',
            'udp',
            'others',
            'diameter',
            'dns-tcp',
            'dns-udp',
            'fast-http',
            'fix',
            'ftp',
            'ftp-proxy',
            'http',
            'imap',
            'mlb',
            'mms',
            'mysql',
            'mssql',
            'pop3',
            'radius',
            'rtsp',
            'sip',
            'sip-tcp',
            'sips',
            'smpp-tcp',
            'spdy',
            'spdys',
            'smtp',
            'ssl-proxy',
            'ssli',
            'tcp-proxy',
            'tftp'
          ],
          'enumMap': [{
            'tcp': '\'TCP LB service'
          }, {
            'udp': '\'UDP Port'
          }, {
            'others': '\'for no tcp/udp protocol, do IP load balancing'
          }, {
            'diameter': '\'diameter port'
          }, {
            'dns-tcp': '\'DNS service over TCP'
          }, {
            'dns-udp': '\'DNS service over UDP'
          }, {
            'fast-http': '\'Fast HTTP Port'
          }, {
            'fix': '\'FIX Port'
          }, {
            'ftp': '\'File Transfer Protocol Port'
          }, {
            'ftp-proxy': '\'ftp proxy port'
          }, {
            'http': '\'HTTP Port'
          }, {
            'imap': '\'imap proxy port'
          }, {
            'mlb': '\'Message based load balancing'
          }, {
            'mms': '\'Microsoft Multimedia Service Port'
          }, {
            'mysql': '\'mssql port'
          }, {
            'mssql': '\'mssql'
          }, {
            'pop3': '\'pop3 proxy port'
          }, {
            'radius': '\'RADIUS Port'
          }, {
            'rtsp': '\'Real Time Streaming Protocol Port'
          }, {
            'sip': '\'Session initiation protocol over UDP'
          }, {
            'sip-tcp': '\'Session initiation protocol over TCP'
          }, {
            'sips': '\'Session initiation protocol over TLS'
          }, {
            'smpp-tcp': '\'SMPP service over TCP'
          }, {
            'spdy': '\'spdy port'
          }, {
            'spdys': '\'spdys port'
          }, {
            'smtp': '\'SMTP Port'
          }, {
            'ssl-proxy': '\'Generic SSL proxy'
          }, {
            'ssli': '\'SSL insight'
          }, {
            'tcp-proxy': '\'Generic TCP proxy'
          }, {
            'tftp': '\'TFTP Port'
          }],
          'description': '',
          'example-default': 'tcp',
          'format': 'enum',
          'src-name': 'protocol'
        },
        'range': {
          'type': 'number',
          'minimum': '0',
          'maximum': '254',
          'modify-ineligible': true,
          'default': '0',
          'condition': 'protocol',
          'disabled': 'others, diameter, ftp, ftp-proxy, mlb, mms, radius, rtsp, sip, sip-tcp, sips, smtp, tftp, mysql, smpp-tcp, spdy, spdys, ssli, mssql',
          'example-default': '1',
          'description': 'Virtual Port range (Virtual Port range value)',
          'format': 'number',
          'src-name': 'range'
        },
        'alternate-port': {
          'type': 'number',
          'format': 'flag',
          'condition': 'protocol',
          'modify-ineligible': true,
          'm-exclusion': 'range',
          'disabled': 'udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, https, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, sips, smtp, ssl-proxy, tcp-proxy, tftp, mysql, mssql, smpp-tcp, spdy, spdys, fix, ssli',
          'example-default': '0',
          'description': 'Alternate Virtual Port',
          'alias': 'alternate-port',
          'src-name': 'alternate'
        },
        'name': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '127',
          'example-default': 'vportname',
          'description': 'SLB Virtual Service Name (SLB Virtual Service Name)',
          'src-name': 'name'
        },
        'conn-limit': {
          'type': 'number',
          'value-not-allowed-in-no': true,
          'minimum': '1',
          'maximum': '8000000',
          'default': '8000000',
          'description': 'Connection Limit (Connection Limit)',
          'format': 'number',
          'src-name': 'conn-limit'
        },
        'reset': {
          'type': 'number',
          'format': 'flag',
          'condition': 'conn-limit',
          'not-allowed-in-no': true,
          'link-next-fwd': 'no-logging',
          'example-default': '0',
          'description': 'Send client reset when connection number over limit',
          'src-name': 'reset'
        },
        'no-logging': {
          'type': 'number',
          'format': 'flag',
          'condition': 'conn-limit',
          'not-allowed-in-no': true,
          'example-default': '1',
          'description': 'Do not log connection over limit event',
          'src-name': 'no-logging'
        },
        'use-alternate-port': {
          'type': 'number',
          'format': 'flag',
          'disabled': 'udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, https, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, sips, smtp, ssl-proxy, tcp-proxy, tftp, mysql, mssql, smpp-tcp, spdy, spdys, fix',
          'description': 'Use alternate virtual port Use alternate virtual port',
          'example-default': '0',
          'alias': 'use-alternate-port',
          'src-name': 'alternate'
        },
        'alternate-port-number': {
          'type': 'number',
          'minimum': '0',
          'maximum': '65534',
          'alias': 'alternate-port-number',
          'condition': 'use-alternate-port',
          'example-default': '8080',
          'description': 'Virtual Port (Port)',
          'format': 'number',
          'src-name': 'port'
        },
        'alt-protocol1': {
          'type': 'string',
          'enum': [
            'http'
          ],
          'enumMap': [{
            'http': '\'HTTP Port'
          }],
          'description': '',
          'condition': 'alternate-port-number',
          'cr-not-allowed-in-norm': true,
          'example-default': 'http',
          'format': 'enum',
          'src-name': 'alt-protocol1'
        },
        'serv-sel-fail': {
          'type': 'number',
          'format': 'flag',
          'condition': 'alt-protocol1',
          'link-next-fwd': 'when-down',
          'example-default': '0',
          'description': 'Use alternate virtual port when server selection failure',
          'src-name': 'serv-sel-fail'
        },
        'when-down': {
          'type': 'number',
          'format': 'flag',
          'condition': 'alt-protocol1',
          'link-next-rev': 'serv-sel-fail',
          'description': 'Use alternate virtual port when down',
          'src-name': 'when-down'
        },
        'alt-protocol2': {
          'type': 'string',
          'enum': [
            'tcp'
          ],
          'enumMap': [{
            'tcp': '\'TCP LB service'
          }],
          'description': '',
          'condition': 'alternate-port-number',
          'cr-not-allowed-in-norm': true,
          'example-default': 'tcp',
          'format': 'enum',
          'src-name': 'alt-protocol2'
        },
        'req-fail': {
          'type': 'number',
          'format': 'flag',
          'condition': 'alt-protocol2',
          'link-next-fwd': 'when-down-protocol2',
          'description': 'Use alternate virtual port when L7 request fail',
          'src-name': 'req-fail'
        },
        'when-down-protocol2': {
          'type': 'number',
          'format': 'flag',
          'condition': 'alt-protocol2',
          'link-next-rev': 'req-fail',
          'alias': 'when-down-protocol2',
          'example-default': '0',
          'description': 'Use alternate virtual port when down',
          'src-name': 'when-down'
        },
        'action': {
          'type': 'string',
          'enum': [
            'enable',
            'disable'
          ],
          'enumMap': [{
            'enable': '\'Enable'
          }, {
            'disable': '\'Disable'
          }],
          'description': '',
          'default': 'enable',
          'not-allowed-in-no': true,
          'format': 'enum',
          'src-name': 'action'
        },
        'l7-service-chain': {
          'type': 'number',
          'format': 'flag',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, mlb, mms, radius, rtsp, sip, sip-tcp, sips, smtp, spdy, spdys, ssl-proxy, tcp-proxy, tftp',
          'hide-help': true,
          'example-default': 'tcp',
          'src-name': 'l7-service-chain'
        },
        'def-selection-if-pref-failed': {
          'type': 'enum',
          'not-allowed-in-no': true,
          'enum': [
            'def-selection-if-pref-failed',
            'def-selection-if-pref-failed-disable'
          ],
          'enumMap': [{
            'def-selection-if-pref-failed': '\'Use default server selection method if prefer method failed'
          }, {
            'def-selection-if-pref-failed-disable': '\'Stop using default server selection method if prefer method failed'
          }],
          'description': '',
          'default': 'def-selection-if-pref-failed',
          'format': 'enum',
          'src-name': 'def-selection-if-pref-failed'
        },
        'ha-conn-mirror': {
          'type': 'number',
          'format': 'flag',
          'disabled': 'dns-udp, dns-tcp, fix, ftp-proxy, http, https, imap, mysql, mssql, pop3, sip-tcp, sips, smpp-tcp, spdy, spdys, smtp, ssl-proxy, tcp-proxy, ssli',
          'example-default': '0',
          'description': 'Enable for HA Conn sync',
          'src-name': 'ha-conn-mirror'
        },
        'on-syn': {
          'type': 'number',
          'format': 'flag',
          'condition': 'ha-conn-mirror',
          'disabled': 'others, tftp, fast-http, sip, udp, diameter, dns-udp, dns-tcp, fix, ftp-proxy, http, https, imap, mysql, mssql, pop3, sip-tcp, sips, smpp-tcp, spdy, spdys, smtp, ssl-proxy, tcp-proxy, ssli',
          'example-default': '0',
          'description': 'Enable for HA Conn sync for l4 tcp sessions on SYN',
          'src-name': 'on-syn'
        },
        'skip-rev-hash': {
          'type': 'number',
          'format': 'flag',
          'description': 'Skip rev tuple hash insertion',
          'src-name': 'skip-rev-hash'
        },
        'message-switching': {
          'type': 'number',
          'format': 'flag',
          'description': 'Message switching',
          'src-name': 'message-switching'
        },
        'force-routing-mode': {
          'type': 'number',
          'format': 'flag',
          'description': 'Force routing mode',
          'src-name': 'force-routing-mode'
        },
        'reset-on-server-selection-fail': {
          'type': 'number',
          'format': 'flag',
          'disabled': 'udp, dns-udp, tftp',
          'description': 'Send client reset when server selection fails',
          'example-default': '0',
          'src-name': 'reset-on-server-selection-fail'
        },
        'clientip-sticky-nat': {
          'type': 'number',
          'format': 'flag',
          'description': 'Prefer to use same source NAT address for a client',
          'example-default': '0',
          'src-name': 'clientip-sticky-nat'
        },
        'extended-stats': {
          'type': 'number',
          'format': 'flag',
          'description': 'Enable extended statistics on virtual port',
          'example-default': '0',
          'src-name': 'extended-stats'
        },
        'gslb-enable': {
          'type': 'number',
          'format': 'flag',
          'plat-neg-list': 'fireeye',
          'disabled': 'tcp,others,diameter,fast-http,ftp,ftp-proxy, http,https,imap, mlb,mms,pop3, radius,rtsp,sip,sip-tcp,sips,smtp,spdy, spdys, ssl-proxy,tcp-proxy,tftp, ssli',
          'description': 'Enable Global Server Load Balancing',
          'example-default': '0',
          'src-name': 'gslb-enable'
        },
        'view': {
          'type': 'number',
          'minimum': '1',
          'maximum': '31',
          'condition': 'gslb-enable',
          'description': 'Specify a GSLB View (ID)',
          'example-default': '1',
          'format': 'number',
          'src-name': 'view'
        },
        'snat-on-vip': {
          'type': 'number',
          'format': 'flag',
          'description': 'Enable source NAT traffic against VIP',
          'example-default': '0',
          'src-name': 'snat-on-vip'
        },
        'stats-data-action': {
          'type': 'string',
          'enum': [
            'stats-data-enable',
            'stats-data-disable'
          ],
          'enumMap': [{
            'stats-data-enable': '\'Enable statistical data collection for virtual port'
          }, {
            'stats-data-disable': '\'Disable statistical data collection for virtual port'
          }],
          'description': '',
          'default': 'stats-data-enable',
          'not-allowed-in-no': true,
          'format': 'enum',
          'src-name': 'stats-data-action'
        },
        'syn-cookie': {
          'type': 'number',
          'format': 'flag',
          'disabled': 'udp, fast-http, dns-udp, radius, sip',
          'description': 'Enable syn-cookie',
          'example-default': '0',
          'src-name': 'syn-cookie'
        },
        'expand': {
          'type': 'number',
          'format': 'flag',
          'condition': 'syn-cookie',
          'disabled': 'http, https, imap, pop3, ssl-proxy, smtp, sip-tcp, sips, tcp-proxy, diameter, dns-tcp, mysql, mssql, fix, smpp-tcp, spdy, spdys, ftp-proxy, ssli',
          'description': 'expand syn-cookie with timestamp and wscale',
          'example-default': '0',
          'src-name': 'expand'
        },
        'access-list': {
          'type': 'dummy',
          'description': 'Apply ACL rules to this Virtual Port',
          'example-default': '0',
          'format': 'dummy',
          'src-name': 'access-list'
        },
        'acl-id-list': {
          'type': 'array',
          'array-start': true,
          'array-multi': true,
          'properties': [{
            'acl-id': {
              'type': 'number',
              'multi-field-key': true,
              'maxItems': '199',
              'minimum': '1',
              'maximum': '199',
              'obj-lineage-full': 'access-list.standard, access-list.extended',
              '$ref': '/axapi/v3/access-list/standard, access-list/extended',
              'description': 'ACL id VPORT',
              'condition': 'access-list',
              'example-default': '1',
              'format': 'number',
              'src-name': 'acl-id'
            }
          }, {
            'acl-id-src-nat-pool': {
              'type': 'string',
              'condition': 'acl-id',
              'multi-field-key': true,
              'example-default': 'snatpool',
              'obj-lineage-full': 'ip.nat.pool, ipv6.nat.pool, ip.nat.pool-group, ipv6.nat.pool-group',
              '$ref': '/axapi/v3/ip/nat/pool, ipv6/nat/pool, ip/nat/pool-group, ipv6/nat/pool-group',
              'description': 'Policy based Source NAT (NAT Pool or Pool Group)',
              'alias': 'acl-id-src-nat-pool',
              'format': 'string',
              'src-name': 'source-nat-pool'
            }
          }, {
            'acl-id-seq-num': {
              'type': 'number',
              'minimum': '1',
              'maximum': '32',
              'condition': 'acl-id-src-nat-pool',
              'example-default': '1',
              'description': 'Specify ACL precedence (sequence-number)',
              'alias': 'acl-id-seq-num',
              'format': 'number',
              'src-name': 'sequence-number'
            }
          }],
          'src-name': 'acl-id-list'
        },
        'acl-name-list': {
          'type': 'array',
          'array-start': true,
          'array-multi': true,
          'properties': [{
            'acl-name': {
              'type': 'string',
              'multi-field-key': true,
              'maxItems': '100',
              'minLength': '1',
              'maxLength': '16',
              'condition': 'access-list',
              'obj-lineage-full': 'ip.access-list, ipv6.access-list',
              '$ref': '/axapi/v3/ip/access-list, ipv6/access-list',
              'description': 'Apply an access list name (Named Access List)',
              'alias': 'acl-name',
              'example-default': 'aclname1',
              'format': 'string',
              'src-name': 'name'
            }
          }, {
            'acl-name-src-nat-pool': {
              'type': 'string',
              'condition': 'acl-name',
              'multi-field-key': true,
              'example-default': 'snatpool',
              'description': 'Policy based Source NAT (NAT Pool or Pool Group)',
              'alias': 'acl-name-src-nat-pool',
              'obj-lineage-full': 'ip.nat.pool, ipv6.nat.pool, ip.nat.pool-group, ipv6.nat.pool-group',
              '$ref': '/axapi/v3/ip/nat/pool, ipv6/nat/pool, ip/nat/pool-group, ipv6/nat/pool-group',
              'format': 'string',
              'src-name': 'source-nat-pool'
            }
          }, {
            'acl-name-seq-num': {
              'type': 'number',
              'minimum': '1',
              'maximum': '32',
              'condition': 'acl-name-src-nat-pool',
              'example-default': '1',
              'description': 'Specify ACL precedence (sequence-number)',
              'alias': 'acl-name-seq-num',
              'format': 'number',
              'src-name': 'sequence-number'
            }
          }],
          'src-name': 'acl-name-list'
        },
        'aflex-scripts': {
          'type': 'array',
          'array-start': true,
          'array-multi': true,
          'properties': [{
            'aflex': {
              'type': 'string',
              'format': 'string-rlx',
              'minLength': '1',
              'maxLength': '63',
              'multi-field-key': true,
              'filetype': 'aflex',
              'disabled': 'tftp',
              'description': 'Bind aFleX Script to the Virtual Port (aFleX Script Name)',
              'example-default': 'aflex_default',
              'maxItems': '16',
              'src-name': 'aflex'
            }
          }],
          'src-name': 'aflex-scripts'
        },
        'no-auto-up-on-aflex': {
          'type': 'number',
          'format': 'flag',
          'description': '',
          'src-name': 'no-auto-up-on-aflex'
        },
        'enable-scaleout': {
          'type': 'number',
          'format': 'flag',
          'hide-help': true,
          'src-name': 'enable-scaleout'
        },
        'scaleout-bucket-count': {
          'type': 'number',
          'default': '32',
          'minimum': '1',
          'maximum': '256',
          'alias': 'scaleout-bucket-count',
          'description': 'Number of traffic buckets',
          'format': 'number',
          'src-name': 'bucket-count'
        },
        'scaleout-device-group': {
          'type': 'number',
          'minimum': '1',
          'maximum': '16',
          'alias': 'scaleout-device-group',
          'description': 'Device group id',
          'format': 'number',
          'src-name': 'device-group'
        },
        'source-nat': {
          'type': 'dummy',
          'description': 'Source NAT',
          'example-default': '0',
          'format': 'dummy',
          'src-name': 'source-nat'
        },
        'pool': {
          'type': 'string',
          'condition': 'source-nat',
          'obj-lineage-full': 'ip.nat.pool, ipv6.nat.pool, ip.nat.pool-group, ipv6.nat.pool-group',
          '$ref': '/axapi/v3/ip/nat/pool, ipv6/nat/pool, ip/nat/pool-group, ipv6/nat/pool-group',
          'description': 'Specify NAT pool or pool group (NAT Pool or Pool Group)',
          'example-default': 'ip.nat.pool',
          'format': 'string',
          'src-name': 'pool'
        },
        'auto': {
          'type': 'number',
          'format': 'flag',
          'condition': 'source-nat',
          'description': 'Configure auto NAT for the vport',
          'example-default': '0',
          'src-name': 'auto'
        },
        'precedence': {
          'type': 'number',
          'format': 'flag',
          'condition': 'auto',
          'description': 'Set auto NAT pool as higher precedence for source NAT',
          'example-default': '0',
          'src-name': 'precedence'
        },
        'use-cgnv6': {
          'type': 'number',
          'format': 'flag',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, fix, ftp, ftp-proxy, http, mlb, mms, mysql, mssql, radius, rtsp, sip, sip-tcp, sips, smpp-tcp, spdy, spdys, smtp, ssl-proxy, tcp-proxy, tftp',
          'condition': 'source-nat',
          'description': 'Follow CGNv6 source NAT configuration',
          'example-default': '0',
          'src-name': 'use-cgnv6'
        },
        'enable-playerid-check': {
          'type': 'number',
          'format': 'flag',
          'enabled': 'udp',
          'description': 'Enable playerid checks on UDP packets once the AX is in active mode',
          'src-name': 'enable-playerid-check'
        },
        'service-group': {
          'type': 'string',
          'format': 'string-rlx',
          'obj-lineage-full': 'slb.service-group',
          '$ref': '/axapi/v3/slb/service-group',
          'description': 'Bind a Service Group to this Virtual Server (Service Group Name)',
          'example-default': 'slb.service-group',
          'src-name': 'service-group'
        },
        'ipinip': {
          'type': 'number',
          'format': 'flag',
          'description': 'Enable IP in IP',
          'example-default': '0',
          'src-name': 'ipinip'
        },
        'ip-map-list': {
          'type': 'string',
          'description': 'Enter name of IP Map List to be bound (IP Map List Name)',
          'example-default': 'ipmap',
          'format': 'string',
          'src-name': 'ip-map-list'
        },
        'rtp-sip-call-id-match': {
          'type': 'number',
          'format': 'flag',
          'enable': 'udp',
          'description': 'rtp traffic try to match the real server of sip smp call-id session',
          'src-name': 'rtp-sip-call-id-match'
        },
        'use-rcv-hop-for-resp': {
          'type': 'number',
          'format': 'flag',
          'description': 'Use receive hop for response to client(For packets on default-vlan, also config \'vlan-global enable-def-vlan-l2-forwarding\'.)',
          'example-default': '0',
          'src-name': 'use-rcv-hop-for-resp'
        },
        'persist-type': {
          'type': 'string',
          'enum': [
            'src-dst-ip-swap-persist',
            'use-src-ip-for-dst-persist',
            'use-dst-ip-for-src-persist'
          ],
          'enumMap': [{
            'src-dst-ip-swap-persist': '\'Create persist session after source IP and destination IP swap'
          }, {
            'use-src-ip-for-dst-persist': '\'Use the source IP to create a destination persist session'
          }, {
            'use-dst-ip-for-src-persist': '\'Use the destination IP to create source IP persist session'
          }],
          'description': '',
          'condition': 'use-rcv-hop-for-resp',
          'example-default': 'use-dst-ip-for-src-persist',
          'format': 'enum',
          'src-name': 'persist-type'
        },
        'template': {
          'type': 'dummy',
          'description': 'Applying Templates to Virtual Port',
          'example-default': '0',
          'format': 'dummy',
          'src-name': 'template'
        },
        'template-sip': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, http, https, imap, mlb, mms, pop3, radius, rtsp, smtp, smpp-tcp, spdy, spdys, ssl-proxy, tcp-proxy, tftp, fix, mysql, mssql',
          'condition': 'template',
          'obj-lineage-full': 'slb.template.sip',
          '$ref': '/axapi/v3/slb/template/sip',
          'example-default': 'slb.template.sip',
          'alias': 'template-sip',
          'description': 'SIP template (SIP Template)',
          'src-name': 'sip'
        },
        'template-smpp': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'enabled': 'smpp-tcp',
          'condition': 'template',
          'obj-lineage-full': 'slb.template.smpp',
          '$ref': '/axapi/v3/slb/template/smpp',
          'example-default': 'slb.template.smpp',
          'alias': 'template-smpp',
          'description': 'SMPP template (SMPP Template)',
          'src-name': 'smpp'
        },
        'template-dblb': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'disabled': 'diameter, dns-tcp, dns-udp, fast-http, fix, ftp, ftp-proxy, http, https, imap, pop3, mlb, mms, others, radius, rtsp, sip, sip-tcp, sips, smpp-tcp, smtp, spdy, spdys, ssl-proxy, tcp, tcp-proxy, tftp, udp',
          'condition': 'template',
          'obj-lineage-full': 'slb.template.dblb',
          '$ref': '/axapi/v3/slb/template/dblb',
          'example-default': 'slb.template.dblb',
          'alias': 'template-dblb',
          'description': 'DBLB Template (DBLB template name)',
          'src-name': 'dblb'
        },
        'template-connection-reuse': {
          'type': 'string',
          'format': 'string-rlx',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, ftp,ftp-proxy, imap, mlb, mms, pop3, radius, rtsp, sip, smtp, ssl-proxy, tcp-proxy, tftp, fix, mysql, mssql',
          'condition': 'template',
          'obj-lineage-full': 'slb.template.connection-reuse',
          '$ref': '/axapi/v3/slb/template/connection-reuse',
          'example-default': 'slb.template.connection-reuse',
          'alias': 'template-connection-reuse',
          'description': 'Connection Reuse Template (Connection Reuse Template Name)',
          'src-name': 'connection-reuse'
        },
        'template-dns': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'disabled': 'tcp, others, diameter, fast-http, ftp, ftp-proxy, http, https, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, sips, smtp, smpp-tcp, spdy, spdys, ssl-proxy, tcp-proxy, tftp, fix, mysql, mssql',
          'condition': 'template',
          'obj-lineage-full': 'slb.template.dns',
          '$ref': '/axapi/v3/slb/template/dns',
          'example-default': 'slb.template.dns',
          'alias': 'template-dns',
          'description': 'DNS template (DNS template name)',
          'src-name': 'dns'
        },
        'template-policy': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'disabled': 'diameter, fix, tftp, mysql, mssql',
          'obj-lineage-full': 'slb.template.policy',
          '$ref': '/axapi/v3/slb/template/policy',
          'example-default': 'slb.template.policy',
          'alias': 'template-policy',
          'description': 'Policy Template (Policy template name)',
          'src-name': 'policy'
        },
        'template-dynamic-service': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'obj-lineage-full': 'slb.template.dynamic-service',
          '$ref': '/axapi/v3/slb/template/dynamic-service',
          'example-default': 'slb.template.dynamic-servce',
          'alias': 'template-dynamic-service',
          'description': 'Dynamic Service Template (dynamic-service template name)',
          'src-name': 'dynamic-service'
        },
        'persist': {
          'type': 'dummy',
          'condition': 'template',
          'disabled': 'fix',
          'example-default': '0',
          'description': 'Persistence Template',
          'format': 'dummy',
          'src-name': 'persist'
        },
        'template-persist-source-ip': {
          'type': 'string',
          'condition': 'persist',
          'obj-lineage-full': 'slb.template.persist.source-ip',
          '$ref': '/axapi/v3/slb/template/persist/source-ip',
          'example-default': 'slb.template.persist.source-ip',
          'alias': 'template-persist-source-ip',
          'description': 'Source IP persistence (Source IP persistence template name)',
          'format': 'string',
          'src-name': 'source-ip'
        },
        'template-persist-destination-ip': {
          'type': 'string',
          'condition': 'persist',
          'obj-lineage-full': 'slb.template.persist.destination-ip',
          '$ref': '/axapi/v3/slb/template/persist/destination-ip',
          'example-default': 'slb.template.persist.destination-ip',
          'alias': 'template-persist-destination-ip',
          'description': 'Destination IP persistence (Destination IP persistence template name)',
          'format': 'string',
          'src-name': 'destination-ip'
        },
        'template-persist-ssl-sid': {
          'type': 'string',
          'condition': 'persist',
          'disabled': 'udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, http, https, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, sips, smtp,spdy, spdys, ssl-proxy, tcp-proxy, mysql, mssql, tftp',
          'obj-lineage-full': 'slb.template.persist.ssl-sid',
          '$ref': '/axapi/v3/slb/template/persist/ssl-sid',
          'example-default': 'slb.template.persist.ssl-sid',
          'alias': 'template-persist-ssl-sid',
          'description': 'SSL session ID persistence (Source IP Persistence Config name)',
          'format': 'string',
          'src-name': 'ssl-sid'
        },
        'template-persist-cookie': {
          'type': 'string',
          'format': 'string-rlx',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, ftp, ftp-proxy, mlb, mms, radius, rtsp, sip, sip-tcp, sips, smtp, ssl-proxy, tcp-proxy, mysql, mssql, tftp',
          'condition': 'persist',
          'obj-lineage-full': 'slb.template.persist.cookie',
          '$ref': '/axapi/v3/slb/template/persist/cookie',
          'example-default': 'slb.template.persist.cookie',
          'alias': 'template-persist-cookie',
          'description': 'Cookie persistence (Cookie persistence template name)',
          'src-name': 'cookie'
        },
        'template-imap-pop3': {
          'type': 'string',
          'format': 'string-rlx',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, http, https, mlb, mms, radius, rtsp, sip, sip-tcp, sips, spdy, spdys,ssl-proxy, tcp-proxy, tftp, smpp-tcp, fix, mysql, mssql',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'obj-lineage-full': 'slb.template.imap-pop3',
          '$ref': '/axapi/v3/slb/template/imap-pop3',
          'example-default': 'slb.template.imap-pop3',
          'alias': 'template-imap-pop3',
          'description': 'IMAP/POP3 Template (IMAP/POP3 Config Name)',
          'src-name': 'imap-pop3'
        },
        'template-smtp': {
          'type': 'string',
          'format': 'string-rlx',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, http, https, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, sips, spdy, spdys,ssl-proxy, tcp-proxy, tftp, smpp-tcp, fix, mysql, mssql',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'obj-lineage-full': 'slb.template.smtp',
          '$ref': '/axapi/v3/slb/template/smtp',
          'example-default': 'slb.template.smtp',
          'alias': 'template-smtp',
          'description': 'SMTP Template (SMTP Config Name)',
          'src-name': 'smtp'
        },
        'template-http': {
          'type': 'string',
          'format': 'string-rlx',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, ftp, ftp-proxy, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, sips, smtp, smpp-tcp, ssl-proxy, tcp-proxy, tftp, fix, mysql, mssql',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'obj-lineage-full': 'slb.template.http',
          '$ref': '/axapi/v3/slb/template/http',
          'example-default': 'slb.template.http',
          'alias': 'template-http',
          'description': 'HTTP Template (HTTP Config Name)',
          'src-name': 'http'
        },
        'template-http-policy': {
          'type': 'string',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, sips, smtp, smpp-tcp, ssl-proxy, tcp-proxy, tftp, fix, mysql, mssql',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'obj-lineage-full': 'slb.template.http-policy',
          '$ref': '/axapi/v3/slb/template/http-policy',
          'example-default': 'slb.template.http-policy',
          'alias': 'template-http-policy',
          'description': 'http-policy template (http-policy template name)',
          'format': 'string',
          'src-name': 'http-policy'
        },
        'redirect-to-https': {
          'type': 'number',
          'format': 'flag',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, ftp, ftp-proxy, https, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, sips, smtp, smpp-tcp, ssl-proxy, tcp-proxy, tftp, fix, mysql, mssql',
          'description': 'Redirect HTTP to HTTPS',
          'src-name': 'redirect-to-https'
        },
        'template-external-service': {
          'type': 'string',
          'format': 'string-rlx',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, smpp-tcp, sips, smtp, ssl-proxy, tcp-proxy, tftp, fix, mysql, mssql',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'obj-lineage-full': 'slb.template.external-service',
          '$ref': '/axapi/v3/slb/template/external-service',
          'example-default': 'slb.template.external-service',
          'alias': 'template-external-service',
          'description': 'External service template (external-service template name)',
          'src-name': 'external-service'
        },
        'template-reqmod-icap': {
          'type': 'string',
          'format': 'string-rlx',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, smpp-tcp, sips, smtp, ssl-proxy, tcp-proxy, tftp, fix, mysql, mssql',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'obj-lineage-full': 'slb.template.reqmod-icap',
          '$ref': '/axapi/v3/slb/template/reqmod-icap',
          'example-default': 'slb.template.reqmod-icap',
          'alias': 'template-reqmod-icap',
          'description': 'ICAP reqmod template (reqmod-icap template name)',
          'feat-license': '=slb',
          'plat-neg-list': 'fireeye',
          'src-name': 'reqmod-icap'
        },
        'template-respmod-icap': {
          'type': 'string',
          'format': 'string-rlx',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, smpp-tcp, sips, smtp, ssl-proxy, tcp-proxy, tftp, fix, mysql, mssql',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'obj-lineage-full': 'slb.template.respmod-icap',
          '$ref': '/axapi/v3/slb/template/respmod-icap',
          'example-default': 'slb.template.respmod-icap',
          'alias': 'template-respmod-icap',
          'description': 'ICAP respmod service template (respmod-icap template name)',
          'feat-license': '=slb',
          'plat-neg-list': 'fireeye',
          'src-name': 'respmod-icap'
        },
        'template-server-ssl': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, imap, mlb, mms, pop3, smpp-tcp, radius, rtsp, sip, tftp, fix',
          'obj-lineage-full': 'slb.template.server-ssl',
          '$ref': '/axapi/v3/slb/template/server-ssl',
          'example-default': 'slb.template.server-ssl',
          'alias': 'template-server-ssl',
          'description': 'Server Side SSL Template (Server SSL Name)',
          'src-name': 'server-ssl'
        },
        'template-client-ssl': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, mlb, mms, radius, rtsp, smpp-tcp,  sip, sip-tcp, tcp-proxy, tftp, fix',
          'obj-lineage-full': 'slb.template.client-ssl',
          '$ref': '/axapi/v3/slb/template/client-ssl',
          'example-default': 'slb.template.client-ssl',
          'alias': 'template-client-ssl',
          'description': 'Client SSL Template (Client SSL Config Name)',
          'src-name': 'client-ssl'
        },
        'template-udp': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'disabled': 'tcp, diameter, dns-tcp, fast-http, ftp, ftp-proxy, imap, http, https, mlb, mms, pop3, rtsp, sip-tcp, sips, smtp, smpp-tcp, spdy, spdys, ssl-proxy, tcp-proxy, fix, mysql, mssql, ssli',
          'obj-lineage-full': 'slb.template.udp',
          '$ref': '/axapi/v3/slb/template/udp',
          'alias': 'template-udp',
          'example-default': 'slb.template.udp',
          'description': 'L4 UDP Template (UDP Config Name)',
          'default': 'default',
          'src-name': 'udp'
        },
        'template-tcp': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'disabled': 'udp, diameter, dns-tcp, dns-udp, ftp-proxy, http, https, imap, pop3, radius, sip, sip-tcp, sips, smtp, smpp-tcp, spdy, spdys, ssl-proxy, tcp-proxy, fix, tftp, mysql, mssql, mlb, ssli',
          'obj-lineage-full': 'slb.template.tcp',
          '$ref': '/axapi/v3/slb/template/tcp',
          'alias': 'template-tcp',
          'example-default': 'slb.template.tcp',
          'description': 'L4 TCP Template (TCP Config Name)',
          'default': 'default',
          'src-name': 'tcp'
        },
        'template-virtual-port': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'obj-lineage-full': 'slb.template.virtual-port',
          '$ref': '/axapi/v3/slb/template/virtual-port',
          'example-default': 'slb.template.virtual-port',
          'alias': 'template-virtual-port',
          'description': 'Virtual port template (Virtual port template name)',
          'default': 'default',
          'src-name': 'virtual-port'
        },
        'template-ftp': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '31',
          'condition': 'template',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp-proxy, http, https, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, sips, smtp,  smpp-tcp, spdy, spdys, ssl-proxy, tcp-proxy, tftp, fix, mysql, mssql',
          'obj-lineage-full': 'slb.template.ftp',
          '$ref': '/axapi/v3/slb/template/ftp',
          'example-default': 'slb.template.ftp',
          'alias': 'template-ftp',
          'description': 'FTP port template (Ftp template name)',
          'src-name': 'ftp'
        },
        'template-diameter': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'disabled': 'tcp, udp, others, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, http, https, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, sips, smtp,  smpp-tcp, spdy, spdys, ssl-proxy, tcp-proxy, tftp, fix, mysql, mssql',
          'obj-lineage-full': 'slb.template.diameter',
          '$ref': '/axapi/v3/slb/template/diameter',
          'example-default': 'slb.template.diameter',
          'alias': 'template-diameter',
          'description': 'Diameter Template (diameter template name)',
          'src-name': 'diameter'
        },
        'template-cache': {
          'type': 'string',
          'format': 'string-rlx',
          'condition': 'template',
          'minLength': '1',
          'maxLength': '63',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, sips, smtp,  smpp-tcp, ssl-proxy, tcp-proxy, tftp, fix, mysql, mssql',
          'obj-lineage-full': 'slb.template.cache',
          '$ref': '/axapi/v3/slb/template/cache',
          'stats-association': 'slb.template.cache',
          'example-default': 'slb.template.cache',
          'alias': 'template-cache',
          'description': 'RAM caching template (Cache Template Name)',
          'feat-license': 'ram-cache',
          'src-name': 'cache'
        },
        'template-fix': {
          'type': 'string',
          'format': 'string-rlx',
          'condition': 'template',
          'minLength': '1',
          'maxLength': '63',
          'enabled': 'fix',
          'obj-lineage-full': 'slb.template.fix',
          '$ref': '/axapi/v3/slb/template/fix',
          'alias': 'template-fix',
          'description': 'FIX template (FIX Template Name)',
          'src-name': 'fix'
        },
        'waf-template': {
          'type': 'string',
          'format': 'string-rlx',
          'plat-neg-list': 'fireeye',
          'condition': 'template',
          'minLength': '1',
          'maxLength': '63',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, ftp, ftp-proxy, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, sips, smtp, spdy, spdys, smpp-tcp, ssl-proxy, tcp-proxy, tftp, fix, mysql, mssql',
          'obj-lineage-full': 'waf.template',
          '$ref': '/axapi/v3/waf/template',
          'feat-license': 'waf',
          'stats-association': 'waf.template',
          'example-default': 'waf.template',
          'alias': 'waf-template',
          'description': 'WAF template (WAF Template Name)',
          'src-name': 'waf'
        },
        'template-ssli': {
          'type': 'string',
          'format': 'string-rlx',
          'condition': 'template',
          'minLength': '1',
          'maxLength': '63',
          'enabled': 'ssli',
          'obj-lineage-full': 'slb.template.ssli',
          '$ref': '/axapi/v3/slb/template/ssli',
          'alias': 'template-ssli',
          'description': 'SSLi template (SSLi Template Name)',
          'feat-license': 'ssli',
          'src-name': 'ssli'
        },
        'tcp-proxy': {
          'type': 'dummy',
          'condition': 'template',
          'disabled': 'tcp, udp, others, dns-udp, fast-http, ftp, mms, radius, rtsp, sip, tftp',
          'example-default': '0',
          'description': 'TCP Proxy Template',
          'default': 'default',
          'format': 'dummy',
          'src-name': 'tcp-proxy'
        },
        'template-tcp-proxy-client': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'tcp-proxy',
          'obj-lineage-full': 'slb.template.tcp-proxy',
          '$ref': '/axapi/v3/slb/template/tcp-proxy',
          'example-default': 'slb.template.tcp-proxy',
          'alias': 'template-tcp-proxy-client',
          'description': 'TCP Proxy Config Client (TCP Proxy Config name)',
          'src-name': 'client'
        },
        'template-tcp-proxy-server': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'tcp-proxy',
          'obj-lineage-full': 'slb.template.tcp-proxy',
          '$ref': '/axapi/v3/slb/template/tcp-proxy',
          'example-default': 'slb.template.tcp-proxy',
          'alias': 'template-tcp-proxy-server',
          'description': 'TCP Proxy Config Server (TCP Proxy Config name)',
          'src-name': 'server'
        },
        'template-tcp-proxy': {
          'type': 'string',
          'format': 'string-rlx',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'tcp-proxy',
          'alias': 'template-tcp-proxy',
          'obj-lineage-full': 'slb.template.tcp-proxy',
          '$ref': '/axapi/v3/slb/template/tcp-proxy',
          'example-default': 'slb.template.tcp-proxy',
          'description': 'TCP Proxy Template Name',
          'src-name': 'name'
        },
        'use-default-if-no-server': {
          'type': 'number',
          'format': 'flag',
          'disabled': 'fast-http, http, tftp',
          'example-default': '1',
          'description': 'Use default forwarding if server selection failed',
          'src-name': 'use-default-if-no-server'
        },
        'template-scaleout': {
          'type': 'string',
          'minLength': '1',
          'maxLength': '63',
          'condition': 'template',
          'disabled': 'ftp,rtsp,sip',
          'alias': 'template-scaleout',
          'description': 'Scaleout template (Scaleout template name)',
          'format': 'string',
          'src-name': 'scaleout'
        },
        'no-dest-nat': {
          'type': 'number',
          'format': 'flag',
          'disabled': 'sip, sips, sip-tcp',
          'description': 'Disable destination NAT, this option only supports in wildcard VIP or when a connection is operated in SSLi + EP mode',
          'example-default': '1',
          'src-name': 'no-dest-nat'
        },
        'port-translation': {
          'type': 'number',
          'format': 'flag',
          'condition': 'no-dest-nat',
          'description': 'Enable port translation under no-dest-nat',
          'example-default': '0',
          'src-name': 'port-translation'
        },
        'l7-hardware-assist': {
          'type': 'number',
          'format': 'flag',
          'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, ftp,ftp-proxy, http, https, imap, mlb, mms, pop3, radius, rtsp, sip, sip-tcp, sips, smtp, spdy, spdys, ssl-proxy, tcp-proxy, tftp, mysql, mssql',
          'plat-neg-list': 'non-fpga, soft-ax',
          'description': 'FPGA assist L7 packet parsing',
          'example-default': '0',
          'src-name': 'l7-hardware-assist'
        },
        'auth-cfg': {
          'type': 'object',
          'array-start': true,
          'properties': {
            'aaa-policy': {
              'type': 'string',
              'plat-neg-list': 'fireeye',
              'minLength': '1',
              'maxLength': '63',
              'disabled': 'tcp, udp, others, diameter, dns-tcp, dns-udp, fast-http, fix, ftp, imap, mlb, mms, pop3, mysql, radius, rtsp, sip, sip-tcp, sips, smpp-tcp, spdy, spdys, smtp, ssl-proxy, ssli, tcp-proxy, tftp',
              'obj-lineage-full': 'aam.aaa-policy',
              '$ref': '/axapi/v3/aam/aaa-policy',
              'description': 'Specify AAA policy name to bind to the virtual port',
              'format': 'string',
              'src-name': 'aaa-policy'
            }
          },
          'src-name': 'auth-cfg'
        }
      },
      'type': 'object'
    }
  }
};
