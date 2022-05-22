
* site names

* for each site, 4 variables
  * quick_learning
  * easy_to_use
  * networking
  * career_prograssion


# Tables

## sites

```

sites (
  id,
  
  name
)

```

## votes

```

votes (
  id,
  site_id,
  
  quick_learning,
  easy_to_use,
  networking,
  career_prograssion,
  
  created_at
)


```

sites table 

{
  { id: 1, name: "site1"},
  
  { id: 2, name: "site2"}
}

vote table
{
  { id: 1, site_id: 1, uick_learning: 1, easy_to_use: 1, networking: 1, career_prograssion: 1, created_at: <some timestamp>},
  
  { id: 2, site_id: 2, uick_learning: 0, easy_to_use: 1, networking: 0, career_prograssion: 1, created_at: <some timestamp>},
  
  { id: 3, site_id: 2, uick_learning: 0, easy_to_use: 0, networking: 1, career_prograssion: 1, created_at: <some timestamp>}
}