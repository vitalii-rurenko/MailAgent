﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MailAgent.Models
{
    public class Email
    {
        public int ID { get; set; }
        public string EmailAddress { get; set; }
        public string UserName { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}