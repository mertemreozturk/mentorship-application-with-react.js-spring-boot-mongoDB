package com.example.obssinternship.service;

import static org.springframework.ldap.query.LdapQueryBuilder.query;

import java.util.List;

import javax.naming.NamingException;
import javax.naming.directory.Attributes;

import com.example.obssinternship.model.Person;
import com.example.obssinternship.repository.PersonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.core.AttributesMapper;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.stereotype.Service;

@Service
public class PersonRepoImpl implements PersonRepo {

    @Autowired
    private LdapTemplate ldapTemplate;

    @Override
    public List<String> getAllPersonNames() {
        List<String> list = ldapTemplate.search(query().where("objectclass").is("person"),
                new PersonNameAttributesMapper());
        return list;
    }

    @Override
    public List<Person> getAllPersons() {
        return ldapTemplate.search(query().where("objectclass").is("person"), new PersonAttributesMapper());
    }

    @Override
    public Person getPersonNamesByUid(String userId) {
        List<Person> people = ldapTemplate.search(query().where("uid").is(userId), new PersonAttributesMapper());
        return ((null != people && !people.isEmpty()) ? people.get(0) : null);
    }

    private class PersonAttributesMapper implements AttributesMapper<Person> {
        public Person mapFromAttributes(Attributes attrs) throws NamingException {
            Person person = new Person();
            person.setUserId(null != attrs.get("uid") ? (String) attrs.get("uid").get() : null);
            person.setUsername(((String) attrs.get("cn").get()));
            person.setRole((String) attrs.get("ou").get());
            return person;
        }
    }

    private class PersonNameAttributesMapper implements AttributesMapper<String> {
        public String mapFromAttributes(Attributes attrs) throws NamingException {
            return attrs.get("cn").get().toString();
        }
    }
}
