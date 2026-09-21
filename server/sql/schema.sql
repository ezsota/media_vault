CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin','user')),
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS directories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  storage_prefix TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS user_directory_access (
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  directory_id BIGINT NOT NULL REFERENCES directories(id) ON DELETE CASCADE,
  PRIMARY KEY(user_id,directory_id)
);

CREATE TABLE IF NOT EXISTS media (
  id BIGSERIAL PRIMARY KEY,
  directory_id BIGINT NOT NULL REFERENCES directories(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  storage_key TEXT UNIQUE NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('photo','video')),
  file_size BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO directories(name,storage_prefix,description) VALUES
('Family','photos/family/','Family photos'),
('Trips','photos/trips/','Travel photos'),
('Videos','videos/','Video library')
ON CONFLICT(name) DO NOTHING;
